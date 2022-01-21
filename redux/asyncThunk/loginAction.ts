import { apiAdmin } from './../../services/apiAction/apiAdmin';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const doLogin = createAsyncThunk('auth/doLogin', async (params: IParamLogin) => {
  const response = await apiAdmin.login(params);
  return response.data;
});
