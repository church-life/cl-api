import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';

import { PrismaService } from '@/db/prisma.service';

import { type CreateCountryDto } from './dto/create-country.dto';
import { type UpdateCountryDto } from './dto/update-country.dto';

@Injectable()
export class CountriesService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createCountryDto: CreateCountryDto) {
    return 'This action adds a new country';
  }

  findAll() {
    return this.prismaService.country.findMany();
  }

  findOne(id: string) {
    return this.prismaService.country.findUnique({ where: { id } });
  }

  update(id: number, updateCountryDto: UpdateCountryDto) {
    return `This action updates a #${id} country`;
  }

  remove(id: number) {
    return `This action removes a #${id} country`;
  }

  private async insertDefaultValues() {
    const countriesToInsert: Prisma.CountryCreateManyInput[] = [
      // {
      //   iso,
      //   name,
      // }
    ];

    // INSERT INTO `country` (`id`, `iso`, `name`, `nicename`, `iso3`, `numcode`, `phonecode`) VALUES
  }
}
