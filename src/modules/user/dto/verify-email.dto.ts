import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class VerifyEmailDtoDto {
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
    username: string;
    
    @IsEmail()
    @IsNotEmpty()
    @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
    email: string;
}