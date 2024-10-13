import {
  Logger,
  Module,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { BullMQModule } from './bullmq';
import { Basic1Module } from './basic-1';
import { RedisModule } from './redis';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfig, validate } from './app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      validate,
    }),
    RedisModule,
    BullMQModule,
    Basic1Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private logger: Logger;

  constructor(private readonly configService: ConfigService<AppConfig>) {
    this.logger = new Logger(AppModule.name);
  }

  async onApplicationBootstrap() {
    const config = JSON.stringify(
      this.configService?.['internalConfig']?.['_PROCESS_ENV_VALIDATED'],
    );
    this.logger.log(config);
  }

  onApplicationShutdown(signal?: string) {
    this.logger.log(`Shutting down on signal ${signal}`);
  }
}
