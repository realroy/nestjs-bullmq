import { Logger, Module, OnApplicationShutdown } from '@nestjs/common';
import { BullModule, InjectQueue } from '@nestjs/bullmq';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';

import { BullMQModule } from 'src/bullmq';

import { BASIC_QUEUE_1_NAME, BASIC_QUEUE_2_NAME } from './basic-1.constant';
import { Basic1Consumer } from './basic-1.consumer';
import { Basic1Controller } from './basic-1.controller';
import { GreetService } from './basic-1.service';
import { join } from 'path';
import { Queue } from 'bullmq';

@Module({
  imports: [
    BullMQModule,
    BullModule.registerQueue(
      {
        name: BASIC_QUEUE_1_NAME,
      },
      {
        name: BASIC_QUEUE_2_NAME,
        processors: [
          {
            limiter: {
              max: 10,
              duration: 10_000,
            },
            path: join(__dirname, 'basic-1-worker-thread.processor.js'),
            useWorkerThreads: true,
          },
          // {
          //   limiter: {
          //     max: 10,
          //     duration: 1000 * 60 * 60,
          //   },
          //   path: join(__dirname, 'basic-1.processor.js'),
          // },
        ],
      },
    ),
    BullBoardModule.forFeature(
      {
        name: BASIC_QUEUE_1_NAME,
        adapter: BullMQAdapter,
      },
      {
        name: BASIC_QUEUE_2_NAME,
        adapter: BullMQAdapter,
      },
    ),
  ],
  controllers: [Basic1Controller],
  providers: [Basic1Consumer, GreetService],
  exports: [],
})
export class Basic1Module implements OnApplicationShutdown {
  private logger: Logger;

  constructor(
    @InjectQueue(BASIC_QUEUE_1_NAME) private readonly basicQueue1: Queue,
    @InjectQueue(BASIC_QUEUE_2_NAME) private readonly basicQueue2: Queue,
  ) {
    this.logger = new Logger(Basic1Module.name);
  }

  async onApplicationShutdown() {
    return await Promise.all([
      this.basicQueue1.pause(),
      this.basicQueue2.pause(),
    ]);
  }
}
