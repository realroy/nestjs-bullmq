import {
  BullRootModuleOptions,
  SharedBullConfigurationFactory,
} from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
import { RedisService } from 'src/redis';

@Injectable()
export class BullMQConfig implements SharedBullConfigurationFactory {
  constructor(private readonly redisService: RedisService) {}

  createSharedConfiguration(): BullRootModuleOptions {
    return {
      connection: this.redisService.getConnection(),
    };
  }
}
