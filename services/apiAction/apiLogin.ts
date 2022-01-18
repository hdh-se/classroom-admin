import axiosMain from "../axios/axiosMain";

const basicUrl = 'Auth/';

export const apiLogin = {
  login: (params: IParamLogin) => {
    const url = basicUrl + 'login';
    return axiosMain.post(url, params);
  },
  register: (params: IParamRegister) => {
    const url = basicUrl + 'register-candidate';
    return axiosMain.post(url, params);
  },
  forgotPassword: (params: IParamFotgotPassword) => {
    const url = basicUrl + 'forgot-password';
    return axiosMain.post(url, params);
  },
  sendVerifiedNumber: (params: IParamSendVerifiedNumber) => {
    const url = basicUrl + 'send-verified-number';
    return axiosMain.post(url, params);
  },
  verifyResetPasswordNumber: (params: IParamVerifyResetPasswordNumber) => {
    const url = basicUrl + 'verify-reset-passowrd-number';
    return axiosMain.post(url, params);
  },
};
