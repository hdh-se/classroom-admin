interface IParamLogin {
  username: string;
  password: string;
}

interface IParamRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface IParamSendVerifiedNumber {
  email: string;
}

interface IParamFotgotPassword {
  email: string;
}

interface IParamVerifyResetPasswordNumber {
  email: string;
  verifiedNumber: number;
}

interface IParamGetClasses {
  currentUser: string;
  title: string;
}

interface IParamGetClassDetail {
  id: string;
  currentUser: string;
}

interface IParamGetClassAssignments {
  courseId: number;
  currentUser: string;
}
