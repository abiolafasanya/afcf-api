import { Transform } from "class-transformer"
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class LoginDto {
    @IsString()
    @IsOptional()
    @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
    username: string
    
    @IsEmail()
    @IsOptional()
    @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
    email: string
    
    @IsString()
    @IsNotEmpty()
    password: string
}
