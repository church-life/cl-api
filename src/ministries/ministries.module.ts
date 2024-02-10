import { Module } from '@nestjs/common';

import { PrismaService } from '@/db/prisma.service';

import { MinistriesController } from './ministries.controller';
import { MinistriesService } from './ministries.service';

@Module({
  controllers: [MinistriesController],
  providers: [PrismaService, MinistriesService],
})
export class MinistriesModule {}
