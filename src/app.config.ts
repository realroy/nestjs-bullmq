import { Exclude, Expose, plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';

class AppConfigValidateError extends Error {}

export function validate(config: unknown) {
  const validatedConfig = plainToInstance(AppConfig, config, {
    enableImplicitConversion: true,
    excludeExtraneousValues: true,
    exposeDefaultValues: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new AppConfigValidateError(errors.toString());
  }

  return validatedConfig;
}

export const NODE_ENVS = ['development', 'production', 'test'] as const;

export type NodeEnvironment = (typeof NODE_ENVS)[number];

@Exclude()
export class EnviromentVariables {
  @Expose()
  @IsEnum(NODE_ENVS)
  NODE_ENV: NodeEnvironment = 'development';

  @Expose()
  @IsNumber()
  PORT: number = 3000;

  @Expose()
  @IsString()
  REDIS_HOST: string;

  @Expose()
  @IsNumber()
  REDIS_PORT: number;

  @Expose()
  @IsOptional()
  @IsString()
  REDIS_PASSWORD: string;
}

export class AppConfig extends EnviromentVariables {}
