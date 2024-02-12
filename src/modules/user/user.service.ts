import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CacheStoreService } from 'src/shared/cache-store/cache-store.service';
import * as bcrypt from "bcrypt";
import { ICreateUser } from './interfaces/user.interface';
import * as helpers from 'src/common/utils/helpers';
import { ConfirmEmailDto } from './dto/confirm-email.dto';
import { Transaction, Op } from 'sequelize';
import { UserRepository } from './repositories/user.repository';
import { HttpRequestService } from 'src/shared/http-request/http-request.service';
import constants from 'src/common/utils/constants';
import { VerifyEmailDtoDto } from './dto/verify-email.dto';
import { SecurityQuestionDto } from './dto/security-question.dto';
import { ForgotPasswordEmailDto, ForgotPasswordUsernameDto, ResetPasswordEmailDto, ResetPasswordUsernameDto, VerifyForgotPasswordOtpDto } from './dto/password.dto';



@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cacheStoreService: CacheStoreService,
    private readonly httpRequestService: HttpRequestService
  ){}

  async changeEmail() {
    const users = await this.userRepository.findAll();

    for (const user of users) {
      if (user.email) {
        await this.userRepository.update({id: user.id}, {email: user.email.toLowerCase()})
      }
    }

    return users.length;
  }

  async create(data: CreateUserDto, transaction: Transaction) {
    const { username, email = '', password } = data;

    const user = await this.userRepository.findOne({ [Op.or]: [{username}, {email}] });

    if (user) throw new BadRequestException("Username or Email already exists");
    
    const salt = await bcrypt.genSalt();

    const hashPassword = bcrypt.hashSync(password, salt);

    const payload: ICreateUser = {
      ...data,
      password: hashPassword
    };

   const userData = await this.userRepository.create(payload, transaction);

   const { password: userPassword, ...rest } = userData.toJSON();

   return rest;
  }

  async verifyEmail(data: VerifyEmailDtoDto) {
    const { username, email } = data;

    const user = await this.userRepository.findOne({ username });

    if (!user) throw new BadRequestException('User not found');

    if (user.emailVerified) throw new BadRequestException("User's email already verified");

    await this.sendOtpToEmail(email, constants.AFM_MEMBERS_EMAIL_VERIFICATION);

    return {
      username, 
      email 
    };
  }
  

  async confirmEmail(data: ConfirmEmailDto, transaction: Transaction) {
    const { username, email, otp } = data;

    const user = await this.validateUser(username);

    if (user.emailVerified) throw new BadRequestException("User's email already verified");

    const userEmail = await this.cacheStoreService.get(otp, constants.AFM_MEMBERS_EMAIL_VERIFICATION);
    
    if (userEmail !== email) throw new BadRequestException('Invalid otp');

    await this.userRepository.update({ username }, {email, emailVerified: true, activated: true}, transaction);

    await this.cacheStoreService.del(otp, constants.AFM_MEMBERS_EMAIL_VERIFICATION);
  }

  
  async setupSecurityQuestion(data: SecurityQuestionDto, transaction: Transaction) {
    const { username, securityQuestion } = data;
    
    const user = await this.validateUser(username);

    if (user.emailVerified) throw new BadRequestException("User's email already verified. No need for security question");

    if (user.securityQuestion) throw new BadRequestException('User already has security question');

    await this.userRepository.update({ username }, { securityQuestion, activated: true }, transaction);
  }

  async forgotPasswordEmail(data: ForgotPasswordEmailDto) {
    const { email } = data;

    await this.validateUser(email);
    
    await this.sendOtpToEmail(email, constants.AFM_MEMBERS_FORGOT_PASSWORD);

    return { 
      email 
    };
  }

  async forgotPasswordUsername(data: ForgotPasswordUsernameDto) {
    const { username } = data;

    const user = await this.validateUser(username);

    if (user.emailVerified) throw new BadRequestException('You have verified your email. Use email for forgot password');

    if (!user.securityQuestion) throw new BadRequestException('No security question setup');

    const ttl = helpers.convertTimeToMilliseconds(24, 'hours');

    await this.cacheStoreService.set(username, user.securityQuestion, ttl, constants.AFM_MEMBERS_FORGOT_PASSWORD);

    return {
      username
    };
  }

  async verifyForgotPasswordOtp(data: VerifyForgotPasswordOtpDto) {
    const { email, otp } = data;

    await this.validateUser(email);

    const userEmail = await this.cacheStoreService.get(otp, constants.AFM_MEMBERS_FORGOT_PASSWORD);
    
    if (userEmail !== email) throw new BadRequestException('Invalid otp');

    return { 
      email,
      otp 
    };
  }

  async verifyForgotPasswordSecurityQuestion(data) {
    const { username, securityQuestion } = data;

    await this.validateUser(username);

    const userSecurityQuestion = await this.cacheStoreService.get(username, constants.AFM_MEMBERS_FORGOT_PASSWORD);
  
    if (userSecurityQuestion.question !== securityQuestion.question && userSecurityQuestion.answer !== securityQuestion.answer) throw new BadRequestException('Invalid security question');

    return {
      username,
      securityQuestion
    };
  }

  async resetPasswordEmail(data: ResetPasswordEmailDto, transaction: Transaction) {
    const { email, otp, newPassword } = data;

    await this.validateUser(email);

    await this.verifyForgotPasswordOtp({email, otp});

    const salt = await bcrypt.genSalt();

    const hashPassword = bcrypt.hashSync(newPassword, salt);

    await this.userRepository.update({ email }, {password: hashPassword}, transaction);

    await this.cacheStoreService.del(otp, constants.AFM_MEMBERS_FORGOT_PASSWORD);
  }

  async resetPasswordUsername(data: ResetPasswordUsernameDto, transaction: Transaction) {
    const { username, newPassword, securityQuestion } = data;

    await this.validateUser(username);

    await this.verifyForgotPasswordSecurityQuestion({ username, securityQuestion });

    const salt = await bcrypt.genSalt();

    const hashPassword = bcrypt.hashSync(newPassword, salt);

    await this.userRepository.update({ username}, {password: hashPassword}, transaction);

    await this.cacheStoreService.del(username, constants.AFM_MEMBERS_FORGOT_PASSWORD);
  }

  private async validateUser(usernameOrEmail: string) {
    const user = await this.userRepository.findOne({ [Op.or]: [{username: usernameOrEmail}, {email: usernameOrEmail}] });

    if (!user) throw new BadRequestException('User not found');

    return user;
  }

  private async sendOtpToEmail(email: string, type: string) {
    const code = helpers.generateOtp();

    const ttl = helpers.convertTimeToMilliseconds(24, 'hours');

    await this.cacheStoreService.set(code, email, ttl, type);

    const content = {
      [constants.AFM_MEMBERS_EMAIL_VERIFICATION]: {
        subject: 'Verification Code',
        body: `Use this verification code <b>${code}</b> to verify your email` 
      },
      [constants.AFM_MEMBERS_FORGOT_PASSWORD]: {
        subject: 'Forgot Password Code',
        body: `Use this OTP code <b>${code}</b> for your forgot password`
      }
    };

    const payloadContent = content[type] || {};

    const payload = {
      recepient: email,
      ...payloadContent
    };

    this.httpRequestService.send({
      url: '/api/v1/mail',
      method: 'post',
      data: payload
    });
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({ email });
  }
  
  async getUserByUsername(username: string) {
    return await this.userRepository.findOne({ username });
  }

  async getAllUsers() {
    return await this.userRepository.findAll();
  }

}
