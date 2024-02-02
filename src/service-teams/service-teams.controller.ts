import { Controller, Get } from '@nestjs/common';

import { ServiceTeamsService } from './service-teams.service';

@Controller('service-teams')
export class ServiceTeamsController {
  constructor(private readonly serviceTeamsService: ServiceTeamsService) {}

  @Get('/')
  async getPublishedPosts() {
    return this.serviceTeamsService.getAll();
  }
}
