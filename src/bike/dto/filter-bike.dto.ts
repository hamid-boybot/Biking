import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { isNull } from 'util';
import {
  IsBoolean,
  IsNumber,
  IsString,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { Transform } from 'class-transformer';

export enum BikeType {
  rapide = 'rapide',
  efficace = 'efficace',
  pascher = 'pascher',
}

export enum BikeState {
  bon = 'bon',
  neuf = 'neuf',
  occase = 'occase',
}

export enum SortType {
  price = 'price',
  state = 'state',
  city = 'city',
}

export class FilterPropertyDTO {
  @ApiPropertyOptional({ example: '3oud ri7' })
  @IsString()
  @IsOptional()
  search: string;

  @ApiPropertyOptional({
    example: 'rapide',
    enum: Object.keys(BikeType),
  })
  propertyt_type: BikeType;

  @ApiPropertyOptional({
    example: 'bon',
    enum: Object.keys(BikeState),
  })
  propertyt_type: BikeType;

  @ApiPropertyOptional({ example: 10 })
  @Transform(take => parseInt(take))
  @IsNumber()
  @IsOptional()
  take: number;

  @ApiPropertyOptional({ example: 0 })
  @Transform(skip => parseInt(skip))
  @IsNumber()
  @IsOptional()
  skip: number;

  @ApiPropertyOptional({ example: 100000 })
  @Transform(price => parseInt(price))
  @IsNumber()
  @IsOptional()
  estimated_price: number;

  @ApiPropertyOptional({
    enum: ['rapide', 'efficace', 'pascher'],
    example: 'pascher',
  })
  @IsOptional()
  property_type: PropertyType;

  @ApiPropertyOptional({ example: '20eme arrondissement Dto' })
  @IsString()
  @IsOptional()
  city: string;

  @ApiPropertyOptional({
    example: 'price',
    enum: Object.keys(SortType),
  })
  @IsOptional()
  sort: SortType;
}
