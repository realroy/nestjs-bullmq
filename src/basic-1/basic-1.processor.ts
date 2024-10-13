import { NestFactory } from '@nestjs/core';
import { Job } from 'bullmq';
import { AppModule } from 'src/app.module';

import { GreetService } from './basic-1.service';

export default async function (job: Job) {
  const startDate = performance.now();
  await job.log('start worker');

  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: false,
  });

  const greetService = app.get(GreetService);

  const message = await greetService.call(job.data);

  await app.close();

  const endDate = performance.now();

  job.log(`message: ${message}`);
  job.log(`time: ${endDate - startDate}ms`);

  return message;
}
