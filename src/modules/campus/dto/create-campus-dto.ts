import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, IsUrl } from 'class-validator';

export class CreateCampusDto {
  @IsString()
  @IsNotEmpty()
  campusName: string;

  @IsString()
  @IsNotEmpty()
  branchName: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  town: string;

  @IsUrl()
  @IsOptional()
  campusPicture: string;

  @IsNumber()
  @IsNotEmpty()
  noOfStudent: number;

  @IsNumber()
  @IsNotEmpty()
  noOfStaff: number;

  @IsString()
  @IsNotEmpty()
  pastorName: string;

  @IsPhoneNumber('NG')
  @IsNotEmpty()
  pastorNumber: string;

  @IsEmail()
  @IsOptional()
  @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
  pastorEmail: string;
}
