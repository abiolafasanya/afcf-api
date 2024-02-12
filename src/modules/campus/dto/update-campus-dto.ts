import { Transform } from 'class-transformer';
import { IsEmail, IsNumber, IsOptional, IsPhoneNumber, IsString, IsUrl } from 'class-validator';

export class UpdateCampusDto {
  @IsString()
  @IsOptional()
  campusName: string;

  @IsString()
  @IsOptional()
  branchName: string;

  @IsString()
  @IsOptional()
  state: string;

  @IsString()
  @IsOptional()
  town: string;

  @IsUrl()
  @IsOptional()
  campusPicture: string;

  @IsNumber()
  @IsOptional()
  noOfStudent: number;

  @IsNumber()
  @IsOptional()
  noOfStaff: number;

  @IsString()
  @IsOptional()
  pastorName: string;

  @IsPhoneNumber('NG')
  @IsOptional()
  pastorNumber: string;

  @IsEmail()
  @IsOptional()
  @Transform(({ value }) => value.toLowerCase(), { toClassOnly: true })
  pastorEmail: string;
}
