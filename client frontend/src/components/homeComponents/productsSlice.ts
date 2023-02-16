import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { productsApi } from "./productsApi";

interface Products {
  data: any;
}

const initialState: Products = {
  data: {},
};

const productsSlice = createSlice({
  name: "productsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addMatcher(
        productsApi.endpoints.getProducts.matchFulfilled,
        (state: Products, action: PayloadAction<any>) => {}
      )
      .addMatcher(
        productsApi.endpoints.getProducts.matchRejected,
        (state: Products, action: PayloadAction<any>) => {}
      );
  },
});

const { reducer, actions } = productsSlice;
// eslint-disable-next-line no-empty-pattern
export const {} = actions;
export default reducer;
