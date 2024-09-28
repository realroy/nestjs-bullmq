import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Job } from 'bullmq';

import { JOB_1_NAME, JOB_2_NAME } from './basic-1.job';
import { BASIC_QUEUE_1_NAME } from './basic-1.constant';
import { GreetService } from './basic-1.service';

@Injectable()
@Processor(BASIC_QUEUE_1_NAME)
export class Basic1Consumer extends WorkerHost {
  constructor(private readonly greetService: GreetService) {
    super();
  }

  async process(job: Job) {
    switch (job.name) {
      case JOB_1_NAME:
        try {
          this.greetService.call(job.data);
          return;
        } catch (error) {
          job.log(JOB_1_NAME + ' failed: ' + error);
          return;
        }
      case JOB_2_NAME:
        return job.log('start job 2');
      default:
        return job.log('unknown job');
    }
  }
}
