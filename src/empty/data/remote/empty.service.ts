import { Injectable } from '@nestjs/common';
import { CreateEmptyDto } from './dto/create-empty.dto';
import { UpdateEmptyDto } from './dto/update-empty.dto';

@Injectable()
export class EmptyService {
  create(createEmptyDto: CreateEmptyDto) {
    return 'This action adds a new empty';
  }

  findAll() {
    return `This action returns all empty`;
  }

  findOne(id: number) {
    return `This action returns a #${id} empty`;
  }

  update(id: number, updateEmptyDto: UpdateEmptyDto) {
    return `This action updates a #${id} empty`;
  }

  remove(id: number) {
    return `This action removes a #${id} empty`;
  }
}
