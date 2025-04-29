import { PartialType } from '@nestjs/mapped-types';
import { CreateEmptyDto } from './create-empty.dto';

export class UpdateEmptyDto extends PartialType(CreateEmptyDto) {}
