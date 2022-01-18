import { combineReducers } from '@reduxjs/toolkit';
import { loginReducer } from '../slices/apiSlices/loginSlice';
import { authReducer } from '../slices/appSlices/authSlice';
import { forgetPasswordReducer } from '../slices/appSlices/forgetPasswordSlice';
import { layoutReducer } from '../slices/appSlices/layoutSlice';

const rootReducer = combineReducers({
  loginReducer,
  authReducer,
  layoutReducer,
  forgetPasswordReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
