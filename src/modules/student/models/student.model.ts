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
} from 'sequelize-typescript';
import { IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { Gender } from '../interfaces/student.interface';
import { CampusModel } from 'src/modules/campus/models/campus.model';
import { DATE } from 'sequelize';

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

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  surName: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  firstName: string;

  @IsOptional()
  @Column({
    type: DataType.TEXT,
  })
  otherName: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  dateOfBirth: string;

  @IsPhoneNumber('NG')
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  phoneNumber: string;

  @IsEmail
  @Column({
    type: DataType.TEXT,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.ENUM(Gender.FEMALE, Gender.MALE),
    allowNull: false,
  })
  gender: Gender;

  @IsString()
  @IsOptional()
  @Column({
    type: DataType.TEXT,
  })
  course: string;

  @IsString()
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  department: string;

  @IsString()
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  level: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  durationOfProgram: number;

  @IsString()
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  session: string;

  @AllowNull(false)
  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  salvationDate: string;

  @AllowNull(false)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  isSanctified: boolean;

  @AllowNull(false)
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  isBaptized: boolean;

  @IsOptional()
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false
  })
  isExco: boolean;

  @ForeignKey(() => CampusModel)
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  campusId: string;

  @IsUrl
  @IsOptional()
  @Column
  photo: string;

  @Column({
    type: DataType.ARRAY(DataType.TEXT),
    allowNull: true,
    defaultValue: [],
  })
  role: string[];

  @BelongsTo(() => CampusModel, { foreignKey: 'campus_fk' })
  campus: CampusModel;
}

/**
  campusId: string;
 surName: string;
 firstName: string;
  otherName: string;
  gender: Gender;
  email: string;
  phoneNumber: string;
  course: string;
  level: string;
  session: string;
  dateOfBirth: string;
  roles: string[]
  salvationDate: string;
  isSantified: boolean;
  isBaptized: boolean;
  isExco: boolean;
 * 
 * **/ 