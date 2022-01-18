interface ILanguage {
  code: string;
  text: string;
  flag: StaticImageData;
}

interface IDropdownSearchItem {
  id: number;
  text: string;
}

interface IFormSelection {
  _id?: string;
  id: number;
  text: string;
}

interface ISelectItem {
  id: number;
  text: string;
}

interface IFormGroupSelection {
  id: number;
  text: string;
  iconSrc: string;
  iconToggledSrc: string;
}

interface IRecruitment {
  id: number;
  title: string;
  logo: string;
  companyName: string;
  city: string;
  timeStart: string;
  fromSalary: string;
  toSalary: string;
}

interface IGeneralCVInfoForm {
  cvTitle: string;
  applyPosition: string;
  avatar: any;
  firstName: string;
  lastName: string;
  expLevel: number;
  yearOfExp: number;
  wishSalary: number;
  groupCareer: number;
}

interface IPersonalCVInfoForm {
  email: string;
  phone: string;
  birthday: Date;
  nationality: number;
  gender: number;
  maritalStatus: number;
  country: number;
  province: number;
  district: number;
  subDistrict: number;
}

interface IIntroductionCVForm {
  intro: string;
}

interface IExperienceCV {
  _id?: string;
  id: number;
  position: string;
  companyName: string;
  fromTime: Date;
  toTime: Date;
  isPresentJob: boolean;
  description: string;
}

interface IEducationCV {
  _id?: string;
  id: number;
  specialization: string;
  school: string;
  degree: id;
  fromTime: Date;
  toTime: Date;
}

interface IReferenceCV {
  _id?: string;
  id: number;
  companyName: string;
  fullName: string;
  position: string;
  email: string;
  phone: string;
}

interface ICertificateCV {
  _id?: string;
  id: number;
  name: string;
  year: string;
  organization: string;
  yearId: number;
  link: string;
}

interface IActivityCV {
  _id?: string;
  id: number;
  name: string;
  fromTime: Date;
  toTime: Date;
  isPresentActivity: boolean;
  description: string;
}

interface ISkillCV {
  _id?: string;
  id: number;
  name: string;
  proficiencyLevel: number;
}

interface ILanguageCV {
  _id?: string;
  id: number;
  languageId: number;
  language: string;
  proficiencyLevel: number;
}

interface IYearOfExp {
  duration: number;
  unit: 'Month' | 'Year';
  status: '=' | '+';
}

interface IWindowSize {
  width: number;
  height: number;
}