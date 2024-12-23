import { createSlice } from "@reduxjs/toolkit";

// Serileştirilemeyen alanları kaldıran yardımcı fonksiyon
const sanitizeCartItem = (item) => ({
  ...item,
  createAt: item.createAt?.toISOString?.() || null, // createAt varsa, ISO string formatına çevir
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart: (state, { payload: item }) => {
      const sanitizedItem = sanitizeCartItem(item);
      const existingItem = state.cartItems.find(
        (cItem) => cItem.id === sanitizedItem.id
      );

      if (existingItem) {
        state.cartItems = state.cartItems.map((cItem) => {
          if (cItem.id === sanitizedItem.id) {
            return { ...cItem, quantity: cItem.quantity + 1 };
          }
          return cItem;
        });
        return;
      }

      state.cartItems = [...state.cartItems, { ...sanitizedItem, quantity: 1 }];
    },
    incrementItemCount: (state, { payload: id }) => {
      state.cartItems = state.cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
    },
    decrementItemCount: (state, { payload: id }) => {
      state.cartItems = state.cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    },
    removeItem: (state, { payload: id }) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== id);
    },
    clearCart: (state) => {
      state.cartItems = []; // Sepeti sıfırla
    },
  },
});

export const {
  addToCart,
  incrementItemCount,
  decrementItemCount,
  removeItem,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
