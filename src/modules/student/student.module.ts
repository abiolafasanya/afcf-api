import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { StudentRepository } from './repositories/student.repository';
import { StudentModel } from './models/student.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { CacheStoreModule } from 'src/shared/cache-store/cache-store.module';
import { HttpRequestModule } from 'src/shared/http-request/http-request.module';
import { CampusService } from '../campus/campus.service';
import { CampusRepository } from '../campus/repositories/campus.repository';

@Module({
  imports: [
    SequelizeModule.forFeature([StudentModel]),
    HttpRequestModule,
    CacheStoreModule,
  ],
  controllers: [StudentController],
  providers: [CampusService, StudentService, StudentRepository, CampusRepository],
})
export class StudentModule {}
