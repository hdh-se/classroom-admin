import axiosMain from '../axios/axiosMain';

const basicUrl = 'admin/';

export const apiAdmin = {
  login: (params: IParamLogin) => {
    const url = basicUrl + 'login';
    return axiosMain.post(url, params);
  },
  //   getClasses: (params) => {
  //     const url = basicUrl + 'login';
  //     return axiosMain.post(url, params);
  //   },
};
