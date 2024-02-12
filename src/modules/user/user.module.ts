import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './models/user.model';
import { CacheStoreModule } from 'src/shared/cache-store/cache-store.module';
import { UserRepository } from './repositories/user.repository';
import { HttpRequestModule } from 'src/shared/http-request/http-request.module';

@Module({
  imports: [SequelizeModule.forFeature([UserModel]), HttpRequestModule, CacheStoreModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService]
})
export class UserModule {}
