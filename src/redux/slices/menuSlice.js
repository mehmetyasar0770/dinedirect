import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProducts } from '../../services/productService'; // Firestore'dan ürün çekme fonksiyonu

// AsyncThunk ile ürünleri Firestore'dan al
export const fetchProducts = createAsyncThunk('menu/fetchProducts', async () => {
  const products = await getProducts();
  return products;
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
      state.products.push(action.payload);
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
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addProduct } = menuSlice.actions;
export default menuSlice.reducer;
