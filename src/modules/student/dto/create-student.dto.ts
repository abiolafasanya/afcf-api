import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, IsUrl } from "class-validator";
import { Gender } from "../interfaces/student.interface";

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  surName: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsOptional()
  otherName?: string;

  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  durationOfProgram?: number;

  @IsPhoneNumber('NG')
  phoneNumber: string;

  @IsString()
  @IsOptional()
  course: string;

  @IsString()
  @IsNotEmpty()
  department: string;

  @IsString()
  @IsNotEmpty()
  level: string;

  @IsString()
  @IsNotEmpty()
  session: string;

  @IsString()
  @IsNotEmpty()
  dateOfBirth: string;

  roles: string[];

  @IsString()
  @IsNotEmpty()
  salvationDate: string;

  @IsBoolean()
  isSanctified: boolean;

  @IsBoolean()
  isBaptized: boolean;

  @IsBoolean()
  @IsOptional()
  isExco: boolean;

  @IsUrl()
  @IsString()
  @IsOptional()
  photo: string;
}
