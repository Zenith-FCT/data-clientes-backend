import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({ status: 200, description: 'API is running' })
  getHello() {
    return this.appService.getHello();
  }

  @Get('api-status')
  @ApiOperation({ summary: 'API connectivity test endpoint' })
  @ApiResponse({ status: 200, description: 'API connectivity details' })
  getApiStatus() {
    const availableEndpoints = [
      '/clientes',
      '/pedidos', 
      '/productos',
    ];
    
    return {
      status: 'online',
      timestamp: new Date().toISOString(),
      endpoints: availableEndpoints,
    };
  }
}
