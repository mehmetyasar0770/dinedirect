import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import authReducer from "./slices/authSlice";
import roleReducer from "./slices/roleSlice";
import menuReducer from './slices/menuSlice';
import promoCodeReducer from './slices/promoCodeSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth:authReducer,
        role:roleReducer,
        menu:menuReducer,
        promoCodes: promoCodeReducer,
    }
})


export default store;