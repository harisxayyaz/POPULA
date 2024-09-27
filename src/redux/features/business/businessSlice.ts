import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  token:""
};

const businessSlice = createSlice({
  name: "business",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<any>) => {
      state.token = action.payload;
    },
    
  },
});

export const {
  setToken
} = businessSlice.actions;

export default businessSlice.reducer;
