import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import authReducer from "./slices/authSlice";
import roleReducer from "./slices/roleSlice";

const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth:authReducer,
        role:roleReducer,
    }
})


export default store;