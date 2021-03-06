interface IClasses {
  id: number;
  title: string;
  classCode: string;
  description: string;
  owner: string;
  createOn: DateTime;
}

interface IAdminAccount {
  id: number;
  username: string;
  email: string;
  fullname: string;
  createdDate: DateTime;
}

interface IStudentAccount {
  id: number;
  studentId: string;
  username: string;
  email: string;
  fullname: string;
  status: number;
  statusText: string;
  createdDate: DateTime;
}
