import { createAsyncThunk } from "@reduxjs/toolkit"
import { apiLogin } from "../../services/apiAction/apiLogin";

export const doLogin = createAsyncThunk(
  'auth/doLogin',
  async (params: IParamLogin) => {
    const response = await apiLogin.login(params);
    return response.data
  }
)

export const doRegister = createAsyncThunk(
  'auth/doRegister',
  async (params: IParamRegister) => {
    const response = await apiLogin.register(params);
    return response.data
  }
)

export const doForgotPassword = createAsyncThunk(
  'auth/doFotgotPassword',
  async (params: IParamFotgotPassword) => {
    const response = await apiLogin.forgotPassword(params);
    return response.data
  }
)

export const doSendVerifiedNumber = createAsyncThunk(
  'auth/doSendVerifiedNumber',
  async (params: IParamSendVerifiedNumber) => {
    const response = await apiLogin.sendVerifiedNumber(params);
    return response.data
  }
)

export const doVerifyResetPasswordNumber = createAsyncThunk(
  'auth/doVerifyResetPasswordNumber',
  async (params: IParamVerifyResetPasswordNumber) => {
    const response = await apiLogin.verifyResetPasswordNumber(params);
    return response.data
  }
)