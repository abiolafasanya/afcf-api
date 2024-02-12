import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class ConfirmEmailDto {
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
    username: string;
    
    @IsEmail()
    @IsNotEmpty()
    @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(6)
    otp: string;
}
