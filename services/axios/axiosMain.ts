import axios, { AxiosError, AxiosResponse } from 'axios';
import { getToken } from '../../utils/common';

const mainURL = process.env.MAIN_URL;

const axiosMain = axios.create({
  baseURL: mainURL,
  headers: {
    'content-type': 'application/json',
    Authorization: 'Bearer ',
  },
});

axiosMain.interceptors.request.use((config) => {
  const token = getToken();
  config.headers.Authorization = 'Bearer ' + token;

  return config;
});

axiosMain.interceptors.response.use(
  (res: AxiosResponse<{ content: any; message: string; result: number }>) => {
    if (res.data.result === 0) {
      alert('Đã có lỗi hệ thống xảy ra (1)');
    }
    return res;
  },
  (err: AxiosError) => {
    throw err;
  },
);

export default axiosMain;
