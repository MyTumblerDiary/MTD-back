import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthCheckController {
  @Get('/health-check')
  public healthCheck(): { success: boolean; date: Date } {
    return {
      success: true,
      date: new Date(),
    };
  }
}
