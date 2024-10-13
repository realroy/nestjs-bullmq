import { Injectable, Logger, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import IORedis from 'ioredis';
import { isEmpty } from 'class-validator';

import { AppConfig } from 'src/app.config';

@Injectable()
export class RedisService implements OnApplicationShutdown {
  private connection: IORedis = null;

  private logger: Logger;

  constructor(private readonly configService: ConfigService<AppConfig, true>) {
    this.logger = new Logger(RedisService.name);
  }

  getConnection() {
    if (isEmpty(this.connection)) {
      this.connection = new IORedis({
        host: this.configService.get('REDIS_HOST'),
        port: this.configService.get('REDIS_PORT'),
        password: this.configService.get('REDIS_PASSWORD'),
        maxRetriesPerRequest: null,
      });

      this.connection.on('connect', () => {
        this.logger.log('Redis connected');
      });
    }

    return this.connection;
  }

  closeConnection() {
    if (this.connection) {
      this.connection.disconnect();
    }
  }

  onApplicationShutdown() {
    // if (this.configService.get('NODE_ENV') === 'production') {
    //   return this.getConnection().quit();
    // }
    // return this.closeConnection();
  }
}
