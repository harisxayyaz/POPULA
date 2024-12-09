import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { set } from "date-fns";

const initialState: any = {
  token:"",
  captionRedux:"",
  hashtagsRedux:"",
  businessId:"",
  selectedPlan: "",
};

const businessSlice = createSlice({
  name: "business",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<any>) => {
      state.token = action.payload;
    },
    setCaptionRedux: (state, action: PayloadAction<any>) => {
      state.captionRedux = action.payload;
    },
    setHashtagsRedux: (state, action: PayloadAction<any>) => {
      state.hashtagsRedux = action.payload;
    },
    setBusinessId: (state, action: PayloadAction<any>) => {
      state.businessId = action.payload;
    },
    setSelectedPlan: (state, action: PayloadAction<any>) => {
      state.selectedPlan = action.payload
    }
  },
});

export const {
  setToken,
  setCaptionRedux,
  setHashtagsRedux,
  setBusinessId,
  setSelectedPlan
} = businessSlice.actions;

export default businessSlice.reducer;
