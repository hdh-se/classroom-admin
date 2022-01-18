import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setToken } from '../../../utils/common';
import { doLogin } from '../../asyncThunk/loginAction';

interface TInitialState {
  email: string;
  token: string;
  message: string;
  isLoading: boolean;
}

const initialState = {
  email: '',
  token: '',
  message: '',
  isLoading: false,
} as TInitialState;

const loginSlice = createSlice({
  name: 'login',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //doLogin
    // builder.addCase(doLogin.pending, (state) => {
    //   state.isLoading = true;
    // })
    // builder.addCase(doLogin.fulfilled, (state, action: PayloadAction<IResLogin>) => {
    //   let payload = action.payload;
    //   if(payload.result === 1) {
    //     setToken(payload.content.token);
    //   } else {
    //     state.message = payload.message;
    //   }
    //   state.isLoading = false;
    // });
    // builder.addCase(doLogin.rejected, (state) => {
    //   state.isLoading = false;
    // });
  },
});

export const loginReducer = loginSlice.reducer;

// export const {} = loginSlice.actions;
