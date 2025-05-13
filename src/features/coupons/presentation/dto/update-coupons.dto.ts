import {PartialType} from '@nestjs/mapped-types';
import {CreateCouponsDto} from './create-coupons.dto';

export class UpdateCouponsDto extends PartialType(CreateCouponsDto) {}
