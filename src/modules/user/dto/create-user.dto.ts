import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { Gender, MaritalStatus } from "../interfaces/user.interface";
import { Transform } from "class-transformer";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
    username: string;
    
    @IsEmail()
    @IsOptional()
    @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    phoneNumber: string;
 
    @IsString()
    @IsNotEmpty()
    firstName: string;
 
    @IsString()
    @IsNotEmpty()
    lastName: string;
 
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @IsEnum(Gender)
    @IsNotEmpty()
    gender: Gender;
    
    @IsString()
    @IsNotEmpty()
    dateOfBirth: string;

    @IsEnum(MaritalStatus)
    @IsNotEmpty()
    maritalStatus: MaritalStatus;

    @IsString()
    @IsNotEmpty()
    churchId: string;

    @IsString()
    @IsNotEmpty()
    occupationId: string;
}
