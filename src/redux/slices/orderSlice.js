import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ref, push } from "firebase/database";
import { realtimeDb } from "../../config/firebase";

// Serileştirme fonksiyonu: Siparişi düzenle
const sanitizeOrder = (order) => ({
  ...order,
  ...(order.orderDate && {
    orderDate: order.orderDate instanceof Date
      ? order.orderDate.toISOString()
      : new Date(order.orderDate).toISOString(),
  }),
  ...(order.appliedPromo && {
    appliedPromo: {
      ...order.appliedPromo,
      validFrom: order.appliedPromo.validFrom instanceof Date
        ? order.appliedPromo.validFrom.toISOString()
        : new Date(order.appliedPromo.validFrom).toISOString(),
      validUntil: order.appliedPromo.validUntil instanceof Date
        ? order.appliedPromo.validUntil.toISOString()
        : new Date(order.appliedPromo.validUntil).toISOString(),
    },
  }),
});

// Sipariş Kaydetme Thunk
export const saveOrder = createAsyncThunk(
  "orders/saveOrder",
  async (order, { rejectWithValue }) => {
    try {
      if (!order || typeof order !== "object") {
        throw new Error("Sipariş verileri eksik veya geçersiz.");
      }
      console.log("Sanitized order data:", order);
      const sanitizedOrder = sanitizeOrder(order); // Sipariş serileştirilir
      console.log("2. Sanitized order data:", sanitizedOrder);
      const ordersRef = ref(realtimeDb, "orders");
      const orderRef = await push(ordersRef, sanitizedOrder);
      console.log("Order pushed to Firebase:", orderRef.key);
      return { id: orderRef.key, ...sanitizedOrder }; // Firebase'de kaydedilen siparişin ID'sini ve içeriğini döndür
    } catch (error) {
      console.error("Sipariş kaydedilirken hata:", error);
      return rejectWithValue(error.message);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    status: "idle", // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(saveOrder.pending, (state) => {
        state.status = "loading";
        state.error = null; // Önceki hataları temizle
      })
      .addCase(saveOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders.push(action.payload); // Serileştirilmiş siparişi Redux state'e ekle
      })
      .addCase(saveOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Sipariş kaydedilirken bilinmeyen bir hata oluştu.";
      });
  },
});

export default orderSlice.reducer;
