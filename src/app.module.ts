import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './shared/database/database.module';
import { ConfigsModule } from './common/configs/configs.module';
import { JwtModule } from '@nestjs/jwt';
import { appProvider } from './common/app.provider';
import { CacheStoreModule } from './shared/cache-store/cache-store.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { QueueModule } from './shared/queue/queue.module';
import { HttpRequestModule } from './shared/http-request/http-request.module';
import { CampusModule } from './modules/campus/campus.module';
import { StudentModule } from './modules/student/student.module';


@Module({
  imports: [ConfigsModule, DatabaseModule, JwtModule, QueueModule, AuthModule, UserModule, CacheStoreModule, HttpRequestModule, CampusModule, StudentModule],
  controllers: [AppController],
  providers: [AppService, ...appProvider]
})
export class AppModule {}
