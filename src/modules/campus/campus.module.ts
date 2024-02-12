import { Module } from '@nestjs/common';
import { CampusService } from './campus.service';
import { CampusController } from './campus.controller';
import { CampusModel } from './models/campus.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { HttpRequestModule } from 'src/shared/http-request/http-request.module';
import { CacheStoreModule } from 'src/shared/cache-store/cache-store.module';
import { CampusRepository } from './repositories/campus.repository';

@Module({
  imports: [
    SequelizeModule.forFeature([CampusModel]),
    HttpRequestModule,
    CacheStoreModule,
  ],
  providers: [CampusService, CampusRepository],
  controllers: [CampusController],
})
export class CampusModule {}
