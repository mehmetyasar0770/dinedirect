import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  //updateProfile,
} from "firebase/auth";
import { auth, db } from "../../config/firebase";
import toast from "react-hot-toast";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Get complete user data from Firestore
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
      const userData = {
        uid: userCredential.user.uid,
        email: userDoc.data().email,
        displayName: userDoc.data().fullName,
        role: userDoc.data().role,
      };

      toast.success(`Hoş geldiniz, ${userData.displayName}!`);
      return userData;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) return null;

      // Firestore'dan kullanıcı bilgilerini alın
      const userDoc = await getDoc(doc(db, "users", currentUser.uid));
      if (userDoc.exists()) {
        const userData = {
          uid: currentUser.uid,
          email: userDoc.data().email,
          displayName: userDoc.data().fullName,
          role: userDoc.data().role,
        };

        // Redux store'u güncelle
        dispatch(setUser(userData));
        return userData;
      } else {
        throw new Error("Kullanıcı bilgisi bulunamadı.");
      }
    } catch (error) {
      console.error("Mevcut kullanıcı bilgisi alınırken hata:", error);
      return rejectWithValue(error.message);
    }
  }
);


export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ email, password, fullName }, { rejectWithValue }) => {
    try {
      // Create user with email/password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Store user data including fullName in Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        role: "user",
        email,
        fullName,
        displayName: fullName,
        uid: userCredential.user.uid,
      });

      // Get user data from Firestore to ensure we use stored data
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
      const userData = {
        uid: userCredential.user.uid,
        email: userDoc.data().email,
        displayName: userDoc.data().fullName, // Get display name from Firestore
        role: userDoc.data().role,
      };

      toast.success(
        `Hesabınız başarıyla oluşturuldu, ${userData.displayName}!`
      );
      return userData;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      toast.success("Başarıyla çıkış yaptınız!");
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: true,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
