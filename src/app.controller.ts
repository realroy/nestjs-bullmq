import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Get Hello' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Hello World' })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
