import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiTags('health')
  @ApiOkResponse({
    description: 'Health check',
  })
  getHello() {
    return this.appService.health();
  }
}
