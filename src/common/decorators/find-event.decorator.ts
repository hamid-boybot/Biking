import { ValidatorConstraint, ValidationArguments } from 'class-validator';
import { BikeRepository } from '../../bike/bike.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ name: 'FindProperty', async: true })
@Injectable()
export class FindProperty {
  constructor(
    @InjectRepository(BikeRepository)
    private readonly bikeRepository: BikeRepository,
  ) {}

  async validate(value: any, args: ValidationArguments) {
    console.log(typeof value + ' ' + JSON.stringify(args));
    const found = await this.bikeRepository.find();
    if (found) return true;
    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return 'User with this email already exists.';
  }
}
