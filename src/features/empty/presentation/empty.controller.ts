import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmptyService } from '../data/remote/empty.service';
import { CreateEmptyDto } from './dto/create-empty.dto';
import { UpdateEmptyDto } from './dto/update-empty.dto';

@Controller('empty')
export class EmptyController {
  constructor(private readonly emptyService: EmptyService) {}

  @Post()
  create(@Body() createEmptyDto: CreateEmptyDto) {
    return this.emptyService.create(createEmptyDto);
  }

  @Get()
  findAll() {
    return this.emptyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emptyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmptyDto: UpdateEmptyDto) {
    return this.emptyService.update(+id, updateEmptyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emptyService.remove(+id);
  }
}
