import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { Job1Data, Job2Data } from './basic-1.job';

export class Job1Dto implements Job1Data {
  @ApiProperty({ description: 'The name of the job' })
  @IsString()
  name: string;
}

export class Job2Dto implements Job2Data {
  @ApiProperty({ description: 'The name of the job' })
  @IsString()
  name: string;
}
