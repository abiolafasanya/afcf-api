import { Module } from '@nestjs/common';
import { CampusService } from './campus.service';
import { CampusController } from './campus.controller';
import { CampusModel } from './models/campus.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { HttpRequestModule } from 'src/shared/http-request/http-request.module';
import { CacheStoreModule } from 'src/shared/cache-store/cache-store.module';
import { CampusRepository } from './repositories/campus.repository';
import { StudentRepository } from '../student/repositories/student.repository';
import { StudentService } from '../student/student.service';

@Module({
  imports: [
    SequelizeModule.forFeature([CampusModel]),
    HttpRequestModule,
    CacheStoreModule,
  ],
  providers: [CampusService, CampusRepository, StudentService, StudentRepository],
  controllers: [CampusController],
  exports: [CampusService]
})
export class CampusModule {}
