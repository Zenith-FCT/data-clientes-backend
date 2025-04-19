import { Injectable } from '@nestjs/common';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CreateEmptyDto } from '../../presentation/dto/create-empty.dto';
import { UpdateEmptyDto } from '../../presentation/dto/update-empty.dto';
/* eslint-enable @typescript-eslint/no-unused-vars */

@Injectable()
export class EmptyService {  create(createEmptyDto: CreateEmptyDto) {
    // Parameter is required by interface but not used in the implementation
    return 'This action adds a new empty';
  }

  findAll() {
    return `This action returns all empty`;
  }
  findOne(id: number) {
    return `This action returns a #${id} empty`;
  }  update(id: number, updateEmptyDto: UpdateEmptyDto) {
    // Parameter is required by interface but not used in the implementation
    return `This action updates a #${id} empty`;
  }

  remove(id: number) {
    return `This action removes a #${id} empty`;
  }
}
