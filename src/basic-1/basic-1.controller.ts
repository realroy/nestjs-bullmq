import { Controller, Post, Query } from '@nestjs/common';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { JOB_1_NAME, JOB_2_NAME } from './basic-1.job';
import { BASIC_QUEUE_1_NAME } from './basic-1.constant';
import { Job1Dto, Job2Dto } from './basic-1.dto';

@ApiTags('Basic 1')
@Controller('/basic-1')
export class Basic1Controller {
  constructor(
    @InjectQueue(BASIC_QUEUE_1_NAME) private readonly basic1Queue: Queue,
  ) {}

  @ApiOperation({ summary: 'Process BASIC_JOB_1 in background' })
  @Post('/job-1')
  async processJob1(@Query() query: Job1Dto) {
    return await this.basic1Queue.add(JOB_1_NAME, query);
  }

  @ApiOperation({ summary: 'Process BASIC_JOB_2 in background' })
  @Post('/job-2')
  async processJob2(@Query() query: Job2Dto) {
    const job = await this.basic1Queue.add(JOB_2_NAME, query);
    return job;
  }
}
