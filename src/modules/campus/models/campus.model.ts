import { AllowNull, Column, DataType, Default, HasMany, IsEmail, IsUrl, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import { IsPhoneNumber, IsString } from 'class-validator';
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

  @AllowNull(false)
  @Column
  noOfStudent: number;

  @AllowNull(false)
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
  pastorNumber: string;

  @Unique
  @Column
  campusId: string;

  @HasMany(() => StudentModel, { foreignKey: 'campus_fk' })
  student: StudentModel;

  @IsUrl
  @Column
  campusPicture: string;
}
