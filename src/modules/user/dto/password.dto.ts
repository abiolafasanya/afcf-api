import { IsEmail, IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator";
import { ISecurityQuestion } from "../interfaces/user.interface";
import { Transform } from "class-transformer";

export class ForgotPasswordEmailDto {    
    @IsEmail()
    @IsNotEmpty()
    @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
    email: string;
}

export class ForgotPasswordUsernameDto {
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
    username: string;
}

export class VerifyForgotPasswordOtpDto {
    @IsEmail()
    @IsNotEmpty()
    @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
    email: string;
    
    @IsString()
    @IsNotEmpty()
    otp: string;
}

export class VerifyForgotPasswordSecurityQuestionDto {
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
    username: string;
    
    @IsObject()
    @IsNotEmpty()
    @Transform(({ value }) => ({...value, answer: value.answer?.toLowerCase()}), { toClassOnly: true })
    securityQuestion: ISecurityQuestion;
}

export class ResetPasswordEmailDto {
    @IsEmail()
    @IsNotEmpty()
    @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
    email: string;
    
    @IsString()
    @IsNotEmpty()
    otp: string;
    
    @IsString()
    @IsNotEmpty()
    newPassword: string;
}

export class ResetPasswordUsernameDto {
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
    username: string;
    
    @IsString()
    @IsNotEmpty()
    newPassword: string;

    @IsObject()
    @IsNotEmpty()
    @Transform(({ value }) => ({...value, answer: value.answer?.toLowerCase()}), { toClassOnly: true })
    securityQuestion: ISecurityQuestion;
}