import {
  AllowNull,
  Column,
  DataType,
  Default,
  HasMany,
  IsEmail,
  IsUrl,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { IsBoolean, IsPhoneNumber, IsString } from 'class-validator';
import { StudentModel } from 'src/modules/student/models/student.model';

@Table({
  tableName: 'campus',
  modelName: 'CampusModel',
  underscored: true,
  freezeTableName: true,
})
export class CampusModel extends Model<CampusModel> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @IsString()
  @Column
  campusName: string;

  @AllowNull(false)
  @Column
  branchName: string;

  @AllowNull(false)
  @Column
  state: string;

  @AllowNull(false)
  @Column
  town: string;

  @Column
  noOfStudent: number;

  @Column
  noOfStaff: number;

  @AllowNull(false)
  @Column
  pastorName: string;

  @AllowNull(false)
  @IsEmail
  @Column
  pastorEmail: string;

  @AllowNull(false)
  @Column
  @IsPhoneNumber('NG')
  pastorPhoneNumber: string;

  @Unique
  @Column
  campusCode: string;

  @IsBoolean()
  @Default(true)
  @Column
  isActivated: boolean;

  @IsUrl
  @Column
  imageUrl: string;

  @HasMany(() => StudentModel)
  students: StudentModel[];
}
