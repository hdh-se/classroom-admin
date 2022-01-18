interface IParamLogin {
  username: string;
  password: string;
  rememberMe: boolean;
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