import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  IsEmail,
  IsUrl,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { Gender } from '../interfaces/student.interface';
import { CampusModel } from 'src/modules/campus/models/campus.model';

@Table({
  tableName: 'student',
  modelName: 'StudentModel',
  underscored: true,
  freezeTableName: true,
})
export class StudentModel extends Model<StudentModel> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @AllowNull(false)
  @Column
  firstName: string;

  @AllowNull(false)
  @Column
  lastName: string;

  @AllowNull(false)
  @Column(DataType.DATEONLY)
  dateOfBirth: string;

  @IsPhoneNumber('NG')
  @Column
  phoneNumber: string;

  @IsEmail
  @Unique
  @AllowNull(false)
  @Column
  email: string;

  @AllowNull(false)
  @Column(DataType.ENUM(Gender.FEMALE, Gender.MALE))
  gender: Gender;

  @AllowNull(false)
  @Column
  department: string;

  @AllowNull(false)
  @Column
  level: string;

  @AllowNull(false)
  @Column
  durationOfProgram: number;

  @AllowNull(false)
  @Column
  session: string;

  @AllowNull(false)
  @Column(DataType.DATEONLY)
  salvationDate: string;

  @AllowNull(false)
  @Column
  isSanctified: boolean;

  @AllowNull(false)
  @Column
  isBaptized: boolean;

  @IsOptional()
  @Default(false)
  @Column
  isExco: boolean;

  @IsOptional()
  @Default(false)
  @Column
  isGraduated: boolean;

  @ForeignKey(() => CampusModel)
  @Column
  campusCode: string;

  @IsUrl
  @Column
  imageUrl: string;

  @Default([])
  @Column(DataType.JSONB)
  roles: { [key: string]: string }[];

  @BelongsTo(() => CampusModel, { foreignKey: 'studentId' })
  campus: CampusModel;
}
