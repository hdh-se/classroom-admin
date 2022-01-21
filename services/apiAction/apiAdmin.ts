import axiosMain from '../axios/axiosMain';

const basicUrl = 'admin/';

export const apiAdmin = {
  login: (params: IParamLogin) => {
    const url = basicUrl + 'login';
    return axiosMain.post(url, params);
  },

  getClasses: (params: IParamGetClasses) => {
    const url = basicUrl + 'course';
    return axiosMain.get(url + `?CurrentUser=${params.currentUser}&Title=${params.title ?? ''}`);
  },

  getClassDetail: (params: IParamGetClassDetail) => {
    const url = basicUrl + 'course';
    return axiosMain.get(url + `/${params.id.toString()}?CurrentUser=${params.currentUser}`);
  },

  getClassAssignments: (params: IParamGetClassAssignments) => {
    const url = basicUrl + 'course/assignments';
    return axiosMain.get(url + `?CourseId${params.courseId.toString()}&CurrentUser=${params.currentUser}`);
  },
};
