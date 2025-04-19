import { Injectable } from '@nestjs/common';
import { CreateEmptyDto } from '../../presentation/dto/create-empty.dto';
import { UpdateEmptyDto } from '../../presentation/dto/update-empty.dto';

@Injectable()
export class EmptyService {  
  create(createEmptyDto: CreateEmptyDto) {
    console.log('Processing:', createEmptyDto);
    return 'This action adds a new empty';
  }

  findAll() {
    return `This action returns all empty`;
  }  findOne(id: number) {
    return `This action returns a #${id} empty`;
  }  
  
  update(id: number, updateEmptyDto: UpdateEmptyDto) {
    console.log('Updating with:', updateEmptyDto);
    return `This action updates a #${id} empty`;
  }

  remove(id: number) {
    return `This action removes a #${id} empty`;
  }
}
