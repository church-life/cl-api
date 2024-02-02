import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/db/prisma.service';

@Injectable()
export class ServiceTeamsService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.serviceTeam.findMany();
  }
}
