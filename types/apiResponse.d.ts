interface IResLogin {
  token: string;
}

interface IResRegister {}

interface IResSendVerifiedNumber {}

enum RoleAccount {
  User = 0,
  Admin = 1,
}

enum UserStatus {
  NotSpecified = 0,
  Active = 1,
  Locked = 50,
  Inactive = 99,
}

interface IUserAccount {
  id: number;
  username: string;
  firstName: string;
  middleName: string;
  lastName: string;
  fullname: string;
  role: RoleAccount;
  gender: 0;
  email: string;
  profileImageUrl: string;
  personalEmail: string;
  studentID: null;
  phoneNumber: string;
  personalPhoneNumber: string;
  userStatus: UserStatus;
  createOn: string;
}
