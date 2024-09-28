import { Body, Controller, Post, Query } from '@nestjs/common';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { JOB_1_NAME } from './basic-1.job';
import { BASIC_QUEUE_1_NAME } from './basic-1.constant';
import { CreateJobBulkDto, CreateJobDto, GreetDto } from './basic-1.dto';
import { GreetService } from './basic-1.service';

@ApiTags('Basic 1')
@Controller('/basic-1')
export class Basic1Controller {
  constructor(
    private readonly greetService: GreetService,
    @InjectQueue(BASIC_QUEUE_1_NAME) private readonly basic1Queue: Queue,
  ) {}

  @ApiOperation({ summary: 'process without job scheduling' })
  @Post('/greet')
  async greet(@Query() query: GreetDto) {
    return await this.greetService.call(query);
  }

  @ApiOperation({ summary: 'process with job scheduling' })
  @Post('/job')
  async processJob(@Query() query: CreateJobDto) {
    return await this.basic1Queue.add(JOB_1_NAME, query);
  }

  @ApiOperation({ summary: 'process bulk job' })
  @Post('/job-bulk')
  async processJobBulk(@Body() body: CreateJobBulkDto) {
    return await this.basic1Queue.addBulk(
      body.data.map((data) => ({
        name: JOB_1_NAME,
        data,
      })),
    );
  }
}
