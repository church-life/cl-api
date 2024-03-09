import { Module } from '@nestjs/common';

import { PrismaService } from '@/db/prisma.service';

import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';

@Module({
  controllers: [CountriesController],
  providers: [PrismaService, CountriesService],
})
export class CountriesModule {}
