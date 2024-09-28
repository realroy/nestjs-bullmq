import { Logger, Module, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ExpressAdapter } from '@bull-board/express';
import { BullBoardModule } from '@bull-board/nestjs';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfig, validate } from './app.config';

import { BullMQModule } from './bullmq/bullmq.module';
import { Basic1Module } from './basic-1/basic-1.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      validate,
    }),
    BullMQModule,
    BullBoardModule.forRootAsync({
      useFactory() {
        return {
          route: '/queues',
          adapter: ExpressAdapter,
        };
      },
    }),
    Basic1Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnApplicationBootstrap {
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
}
