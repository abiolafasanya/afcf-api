import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from "bcrypt";
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';


@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login(data: LoginDto) {
    const {username, email, password } = data;

    if (username) {
      const user = await this.userService.getUserByUsername(username);

      if (!user) throw new UnauthorizedException('Invalid login credentials');

      const comparePassword = bcrypt.compareSync(password, user.password);

      if (!comparePassword) throw new UnauthorizedException('Password is incorrect');

      const { password: userPassword, securityQuestion, ...rest } = user.toJSON();

      return rest;
    }
    
    if (email) {
      const user = await this.userService.getUserByEmail(email);

      if (!user) throw new UnauthorizedException('Invalid login credentials');

      const comparePassword = bcrypt.compareSync(password, user.password);

      if (!comparePassword) throw new UnauthorizedException('Password is incorrect');

      const { password: userPassword, securityQuestion, ...rest } = user.toJSON();

      return rest;
    }

  }
}
