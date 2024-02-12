import { Controller, Get, Post, Body, HttpCode, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { ConfirmEmailDto } from './dto/confirm-email.dto';
import { TransactionParam } from 'src/common/decorators/transaction-param.decorator';
import { Transaction } from 'sequelize';
import { VerifyEmailDtoDto } from './dto/verify-email.dto';
import { SecurityQuestionDto } from './dto/security-question.dto';
import { ForgotPasswordEmailDto, ForgotPasswordUsernameDto, ResetPasswordEmailDto, ResetPasswordUsernameDto, VerifyForgotPasswordOtpDto, VerifyForgotPasswordSecurityQuestionDto } from './dto/password.dto';
import constants from 'src/common/utils/constants';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Get('change-email')
  @ResponseMessage('Email Changed')
  async changeEmail() {
    return this.userService.changeEmail();
  }

  @Public()
  @Get('security-questions')
  @ResponseMessage('Security questions')
  async getSecurityQuestions() {
    return constants.SECURITY_QUESTIONS;
  }

  @Public()
  @Post('register')
  @ResponseMessage('User\'s details saved successfully. Proceed to verification')
  async create(@Body() body: CreateUserDto, @TransactionParam() transaction: Transaction) {
    return this.userService.create(body, transaction);
  }

  @Public()
  @Post('verify-email')
  @HttpCode(200)
  @ResponseMessage('Kindly check your email for otp to verify your email')
  async verifyEmail(@Body() body: VerifyEmailDtoDto) {
    return this.userService.verifyEmail(body);
  }

  @Public()
  @Post('confirm-email')
  @HttpCode(200)
  @ResponseMessage('Email verified and account activated successfully. Proceed to log in')
  async confirmEmail(@Body() body: ConfirmEmailDto, @TransactionParam() transaction: Transaction) {
    return this.userService.confirmEmail(body, transaction);
  }

  @Public()
  @Post('setup-security-question')
  @HttpCode(200)
  @ResponseMessage('Security question setup and account activated successfully. Proceed to log in')
  async setupSecurityQuestion(@Body() body: SecurityQuestionDto, @TransactionParam() transaction: Transaction) {
    return this.userService.setupSecurityQuestion(body, transaction);
  }

  @Public()
  @Post('forgot-password-email')
  @HttpCode(200)
  @ResponseMessage('Kindly check your email for your otp')
  async forgotPasswordEmail(@Body() body: ForgotPasswordEmailDto) {
    return this.userService.forgotPasswordEmail(body);
  }
 
  @Public()
  @Post('forgot-password-username')
  @HttpCode(200)
  @ResponseMessage('Enter your security question and answer')
  async forgotPasswordUsername(@Body() body: ForgotPasswordUsernameDto) {
    return this.userService.forgotPasswordUsername(body);
  }

  @Public()
  @Post('verify-forgot-password-otp')
  @HttpCode(200)
  @ResponseMessage('Proceed to change your password')
  async verifyForgotPasswordOtp(@Body() body: VerifyForgotPasswordOtpDto) {
    return this.userService.verifyForgotPasswordOtp(body);
  }

  @Public()
  @Post('verify-forgot-password-security-question')
  @HttpCode(200)
  @ResponseMessage('Proced to change your password')
  async verifyForgotPasswordSecurityQuestion(@Body() body: VerifyForgotPasswordSecurityQuestionDto) {
    return this.userService.verifyForgotPasswordSecurityQuestion(body);
  }

  @Public()
  @Post('reset-password-email')
  @HttpCode(200)
  @ResponseMessage('Password reset successful. Proceed to login')
  async resetPasswordEmail(@Body() body: ResetPasswordEmailDto, @TransactionParam() transaction: Transaction) {
    return this.userService.resetPasswordEmail(body, transaction);
  }

  @Public()
  @Post('reset-password-username')
  @HttpCode(200)
  @ResponseMessage('Password reset successful. Proceed to login')
  async resetPasswordUsername(@Body() body: ResetPasswordUsernameDto, @TransactionParam() transaction: Transaction) {
    return this.userService.resetPasswordUsername(body, transaction);
  }

  // @Public()
  // @Post('update-password')
  // @HttpCode(200)
  // @ResponseMessage('All Updated')
  // async updatePassword() {
  //   return this.userService.updatePassword();
  // }
  

  @Public()
  @Get()
  @ResponseMessage('User data')
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Public()
  @Get('email/:email')
  @ResponseMessage('User data')
  async getUserByEmail(@Param('email') email: string) {
    return this.userService.getUserByEmail(email);
  }
  
  @Public()
  @Get('username/:username')
  @ResponseMessage('User data')
  async getUserByUsername(@Param('username') username: string) {
    return this.userService.getUserByUsername(username);
  }
}
