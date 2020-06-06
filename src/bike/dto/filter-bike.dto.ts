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
  vtc = 'vélo tout chemin',
  vtt = 'vélo tout terrain',
  city = 'vélo de ville',
  road = 'vélo de route',
  electric = 'vélo à assistance électrique',
  vtt_electric = 'VTT à assistance electrique',
}
export enum BikeState {
  bon = 'bon',
  moyen = 'moyen',
  neuf = 'neuf',
}

export enum BikeSize {
  adulteM = 'Adulte M',
  adulteL = 'Adulte L',
  adulteXL = 'Adulte XL',
  child = 'Enfant',
}
export enum SortType {
  state = 'state',
  // city = 'city',
  km = 'km',
  size = 'size',
}

export class FilterBikeDTO {
  @ApiPropertyOptional({ example: '3oud ri7' })
  @IsString()
  @IsOptional()
  search: string;

  @ApiPropertyOptional({
    example: 'vtt',
    enum: Object.keys(BikeType),
  })
  bike_type: BikeType;

  @ApiPropertyOptional({
    example: 'bon',
    enum: Object.keys(BikeState),
  })
  bike_state: BikeState;

  @ApiPropertyOptional({
    example: 'adulteM',
    enum: Object.keys(BikeSize),
  })
  bike_size: BikeSize;

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

  // @ApiPropertyOptional({
  //   enum: ['vtc', 'vtt', 'city'],
  //   example: 'vtc',
  // })
  // @IsOptional()
  // bike_type: BikeType;

  // @ApiPropertyOptional({
  //   enum: ['bon', 'moyen', 'neuf'],
  //   example: 'moyen',
  // })
  // @IsOptional()
  // bike_state: BikeState;

  // @ApiPropertyOptional({
  //   enum: ['Adulte M', 'Adulte L', 'Adulte XL', 'Enfant'],
  //   example: 'Adulte M',
  // })
  // @IsOptional()
  // bike_size: BikeSize;

  // @ApiPropertyOptional({ example: '20eme arrondissement Dto' })
  // @IsString()
  // @IsOptional()
  // city: string;

  @ApiPropertyOptional({
    example: 'state',
    enum: Object.keys(SortType),
  })
  @IsOptional()
  sort: SortType;
}
