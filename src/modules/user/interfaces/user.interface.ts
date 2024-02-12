export interface ICreateUser {
    username: string;
    email?: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    password: string;
    gender: Gender;
    dateOfBirth: string;
    maritalStatus: MaritalStatus;
    churchId: string;
    occupationId: string;
}

export interface ISecurityQuestion {
    question: string;
    answer: string;
}

export interface IValidateUser {
    
}

export enum Gender {
    FEMALE = 'Female',
    MALE = 'Male'
}

export enum MaritalStatus {
    SINGLE = 'Single',
    MARRIED = 'Married',
    WIDOWED = 'Widowed'
}