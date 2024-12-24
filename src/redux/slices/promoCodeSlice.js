import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import toast from 'react-hot-toast';

// Promosyon kodu ekleme
export const addPromoCode = createAsyncThunk(
  'promoCodes/addPromoCode',
  async (promoCode, { rejectWithValue }) => {
    try {
      const docRef = await addDoc(collection(db, 'promoCodes'), promoCode);
      return { id: docRef.id, ...promoCode };
    } catch (error) {
      console.error('Firestore hata:', error);
      return rejectWithValue(error.message);
    }
  }
);

// Tüm promosyon kodlarını alma
export const getPromoCodes = createAsyncThunk(
  'promoCodes/getPromoCodes',
  async (_, { rejectWithValue }) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'promoCodes'));
      const promoCodes = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return promoCodes;
    } catch (error) {
      toast.error('Promosyon kodları alınırken hata oluştu.');
      return rejectWithValue(error.message);
    }
  }
);

// Promosyon kodu güncelleme
export const updatePromoCode = createAsyncThunk(
  'promoCodes/updatePromoCode',
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const promoCodeRef = doc(db, 'promoCodes', id);
      await updateDoc(promoCodeRef, updates);
      toast.success('Promosyon kodu başarıyla güncellendi!');
      return { id, updates };
    } catch (error) {
      toast.error('Promosyon kodu güncellenirken hata oluştu.');
      return rejectWithValue(error.message);
    }
  }
);

const promoCodeSlice = createSlice({
  name: 'promoCodes',
  initialState: {
    promoCodes: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addPromoCode.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPromoCode.fulfilled, (state, action) => {
        state.loading = false;
        state.promoCodes.push(action.payload);
      })
      .addCase(addPromoCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getPromoCodes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPromoCodes.fulfilled, (state, action) => {
        state.loading = false;
        state.promoCodes = action.payload;
      })
      .addCase(getPromoCodes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updatePromoCode.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePromoCode.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.promoCodes.findIndex((promo) => promo.id === action.payload.id);
        if (index !== -1) {
          state.promoCodes[index] = {
            ...state.promoCodes[index],
            ...action.payload.updates,
          };
        }
      })
      .addCase(updatePromoCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default promoCodeSlice.reducer;
