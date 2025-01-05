import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import authReducer from "./slices/authSlice";
import roleReducer from "./slices/roleSlice";
import menuReducer from './slices/menuSlice';
import promoCodeReducer from './slices/promoCodeSlice';
import orderReducer from "./slices/orderSlice";
import checkoutReducer from "./slices/checkoutSlice";

const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth:authReducer,
        role:roleReducer,
        menu:menuReducer,
        promoCodes: promoCodeReducer,
        orders: orderReducer,
        checkout:checkoutReducer,
    }
})


export default store;