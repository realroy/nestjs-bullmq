import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';

import { BullMQModule } from 'src/bullmq';

import { BASIC_QUEUE_1_NAME } from './basic-1.constant';
import { Basic1Consumer } from './basic-1.consumer';
import { Basic1Controller } from './basic-1.controller';
import { GreetService } from './basic-1.service';

@Module({
  imports: [
    BullMQModule,
    BullModule.registerQueue({
      name: BASIC_QUEUE_1_NAME,
    }),
    BullBoardModule.forFeature({
      name: BASIC_QUEUE_1_NAME,
      adapter: BullMQAdapter,
    }),
  ],
  controllers: [Basic1Controller],
  providers: [Basic1Consumer, GreetService],
  exports: [],
})
export class Basic1Module {}
