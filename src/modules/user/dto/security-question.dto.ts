import { IsNotEmpty, IsObject, IsString } from "class-validator";
import { ISecurityQuestion } from "../interfaces/user.interface";
import { Transform } from "class-transformer";


export class SecurityQuestionDto {
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
    username: string;
    
    @IsObject()
    @IsNotEmpty()
    @Transform(({ value }) => ({...value, answer: value.answer?.toLowerCase()}), { toClassOnly: true })
    securityQuestion: ISecurityQuestion;
}
