import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/db/prisma.service';

import { type CreateMinistryDto } from './dto/create-ministry.dto';
import { type UpdateMinistryDto } from './dto/update-ministry.dto';

@Injectable()
export class MinistriesService {
  constructor(private prisma: PrismaService) {}

  create(createMinistryDto: CreateMinistryDto) {
    return 'This action adds a new ministry';
  }

  findAll() {
    return this.prisma.ministry.findMany();
  }

  findOne(id: string) {
    return this.prisma.ministry.findUnique({ where: { id } });
  }

  update(id: string, updateMinistryDto: UpdateMinistryDto) {
    return `This action updates a #${id} ministry`;
  }

  remove(id: string) {
    return `This action removes a #${id} ministry`;
  }
}
