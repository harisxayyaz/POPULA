import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  token:"",
  captionRedux:"",
  hashtagsRedux:"",
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
  },
});

export const {
  setToken,
  setCaptionRedux,
  setHashtagsRedux
} = businessSlice.actions;

export default businessSlice.reducer;
