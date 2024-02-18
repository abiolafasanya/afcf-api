export interface ICreateStudent {
  campusCode: string;
  lastName: string;
  firstName: string;
  gender: Gender;
  email: string;
  durationOfProgram?: number;
  phoneNumber: string;
  department: string;
  level: string;
  session: string;
  dateOfBirth: Date;
  roles?: string[];
  salvationDate: Date;
  isSanctified: boolean;
  isBaptized: boolean;
  isExco?: boolean;
  imageUrl?: string;
}

export interface IUpdateStudent extends Partial<ICreateStudent> {}

export enum Gender {
  FEMALE = 'Female',
  MALE = 'Male',
}