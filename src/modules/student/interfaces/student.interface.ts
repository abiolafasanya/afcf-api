export interface ICreateStudent {
  campusCode: string;
  lastName: string;
  firstName: string;
  otherName?: string;
  gender: Gender;
  email: string;
  durationOfProgram?: number;
  phoneNumber: string;
  department: string;
  level: string;
  session: string;
  dateOfBirth: string;
  roles?: string[];
  salvationDate: string;
  isSanctified: boolean;
  isBaptized: boolean;
  isExco?: boolean;
  photo?: string;
}

export interface IUpdateStudent extends Partial<ICreateStudent> {}

export enum Gender {
  FEMALE = 'Female',
  MALE = 'Male',
}