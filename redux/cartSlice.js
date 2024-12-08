import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:"cartSlice",
    initialState: {
        count: 1
    },
    reducers: {
        increase: (state) => {
            state.count += 1;
          },
          decrease: (state) => {
            state.count -= 1;
          },

    }
});

export default cartSlice;