import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProducts } from '../../services/productService'; // Firestore'dan ürün çekme fonksiyonu

// Serileştirilemeyen alanları temizlemek için yardımcı fonksiyon
const sanitizeProduct = (product) => ({
  ...product,
  createAt: product.createAt?.toISOString?.() || null, // createAt varsa, ISO string formatına çevir
});

// AsyncThunk ile ürünleri Firestore'dan al
export const fetchProducts = createAsyncThunk('menu/fetchProducts', async () => {
  const products = await getProducts();
  return products.map(sanitizeProduct); // Ürünleri sanitize ederek döndür
});

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Yeni ürün ekleme
    addProduct: (state, action) => {
      const sanitizedProduct = sanitizeProduct(action.payload); // Ürünü sanitize et
      state.products.push(sanitizedProduct);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload; // Zaten sanitize edilmiş veriler
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addProduct } = menuSlice.actions;
export default menuSlice.reducer;
