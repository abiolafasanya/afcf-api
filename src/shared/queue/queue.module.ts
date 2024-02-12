import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { QueueController } from './queue.controller';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get<string>('redisHost'),
          port: configService.get<number>('redisPort')
        }
      }),
      inject: [ConfigService]
    }),
    BullModule.registerQueue({
      
    })
  ],
  controllers: [QueueController],
  providers: [QueueService]
})
export class QueueModule {}
