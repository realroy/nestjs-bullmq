import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';

import { BullMQConfig } from './bullmq.config';
import { BullBoardModule } from '@bull-board/nestjs';
import { ExpressAdapter } from '@bull-board/express';
import { RedisModule } from 'src/redis';

@Module({
  imports: [
    RedisModule,
    BullModule.forRootAsync({
      useClass: BullMQConfig,
    }),
    BullBoardModule.forRoot({
      route: '/queues',
      adapter: ExpressAdapter,
    }),
  ],
})
export class BullMQModule {}
