import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TInitialState {
  stepForgetPassword: number;
}

const initialState = {
  stepForgetPassword: 0,
} as TInitialState;

const forgetPasswordSlice = createSlice({
  name: 'layout',
  initialState: initialState,
  reducers: {
    setStepForgetPassword: (state, action: PayloadAction<number>) => {
      state.stepForgetPassword = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const forgetPasswordReducer = forgetPasswordSlice.reducer;

export const { 
  setStepForgetPassword 
} = forgetPasswordSlice.actions;
