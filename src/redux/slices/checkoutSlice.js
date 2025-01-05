import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deliveryDetails: {
    address: "",
    note: "",
    serviceRequest: "",
  },
  paymentDetails: {
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  },
  step: 1,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setDeliveryDetails: (state, action) => {
      state.deliveryDetails = action.payload;
    },
    setPaymentDetails: (state, action) => {
      state.paymentDetails = action.payload;
    },
    nextStep: (state) => {
      state.step += 1;
    },
    resetCheckout: () => initialState,
  },
});

export const {
  setDeliveryDetails,
  setPaymentDetails,
  nextStep,
  resetCheckout,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
