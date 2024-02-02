import { Module } from '@nestjs/common';

import { PrismaService } from '@/db/prisma.service';

import { ServiceTeamsController } from './service-teams.controller';
import { ServiceTeamsService } from './service-teams.service';

@Module({
  imports: [],
  controllers: [ServiceTeamsController],
  providers: [ServiceTeamsService, PrismaService],
})
export class ServiceTeamsModule {}
