import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/db/prisma.service';

import { type CreateMinistryDto } from './dto/create-ministry.dto';
import { type UpdateMinistryDto } from './dto/update-ministry.dto';

@Injectable()
export class MinistriesService {
  constructor(private prisma: PrismaService) {}

  create(createMinistryDto: CreateMinistryDto) {
    return this.prisma.ministry.create({ data: createMinistryDto });
  }

  findAll() {
    return this.prisma.ministry.findMany();
  }

  findOne(id: string) {
    return this.prisma.ministry.findUnique({ where: { id } });
  }

  update(id: string, updateMinistryDto: UpdateMinistryDto) {
    return this.prisma.ministry.update({
      where: { id },
      data: updateMinistryDto,
    });
  }

  remove(id: string) {
    return this.prisma.ministry.delete({ where: { id } });
  }
}
