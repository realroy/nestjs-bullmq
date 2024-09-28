import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, ValidateNested } from 'class-validator';

import { GreetServiceInput } from './basic-1.service';
import { Type } from 'class-transformer';

export class GreetDto implements GreetServiceInput {
  @ApiProperty({ description: 'The name for greeting' })
  @IsString()
  name: string;
}

export class CreateJobDto extends GreetDto {}

export class CreateJobBulkDto {
  @ApiProperty({ description: 'The data for job', type: [CreateJobDto] })
  @ValidateNested()
  @IsArray()
  @Type(() => CreateJobDto)
  data: CreateJobDto[] = [];
}
