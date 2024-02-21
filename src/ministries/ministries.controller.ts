import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CreateMinistryDto } from './dto/create-ministry.dto';
import { UpdateMinistryDto } from './dto/update-ministry.dto';
import { MinistriesService } from './ministries.service';

@ApiBearerAuth()
@ApiTags('ministries')
@UseGuards(AuthGuard('jwt'))
@Controller('ministries')
export class MinistriesController {
  constructor(private readonly ministriesService: MinistriesService) {}

  @Post()
  create(@Body() createMinistryDto: CreateMinistryDto) {
    return this.ministriesService.create(createMinistryDto);
  }

  @Get()
  findAll() {
    return this.ministriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ministriesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMinistryDto: UpdateMinistryDto) {
    return this.ministriesService.update(id, updateMinistryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ministriesService.remove(id);
  }
}
