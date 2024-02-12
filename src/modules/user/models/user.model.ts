import { AllowNull, Column, DataType, Default, IsEmail, IsUrl, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import { Gender, ISecurityQuestion, MaritalStatus } from '../interfaces/user.interface';

@Table({
    tableName: 'user',
    modelName: 'UserModel',
    underscored: true,
    freezeTableName: true
})
export class UserModel extends Model<UserModel> {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string;

    @Unique
    @IsEmail
    @Column
    email: string;

    @Unique
    @AllowNull(false)
    @Column
    username: string;

    @AllowNull(false)
    @Column
    firstName: string;

    @AllowNull(false)
    @Column
    lastName: string;

    @AllowNull(false)
    @Column
    phoneNumber: string;

    @AllowNull(false)
    @Column
    password: string;

    @AllowNull(false)
    @Column(DataType.ENUM(Gender.MALE, Gender.FEMALE))
    gender: Gender;

    @AllowNull(false)
    @Column(DataType.DATEONLY)
    dateOfBirth: string;

    @AllowNull(false)
    @Column(DataType.ENUM(MaritalStatus.SINGLE, MaritalStatus.MARRIED, MaritalStatus.WIDOWED))
    maritalStatus: MaritalStatus;

    @AllowNull(false)
    @Column
    churchId: string;

    @AllowNull(false)
    @Column
    occupationId: string;
    
    @Column
    levelId: string;
    
    @Default(false)
    @Column
    activated: boolean;

    @Column(DataType.JSONB)
    securityQuestion: ISecurityQuestion;
    
    @Default(false)
    @Column
    emailVerified: boolean;

    @IsUrl
    @Column
    profilePicture: string;

    @Column(DataType.JSONB)
    roles: {[key: string]: any}[]
}
