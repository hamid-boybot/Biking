import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { isNull } from 'util';
import {
  IsBoolean,
  IsNumber,
  IsString,
  IsOptional,
  IsDateString,
  IsDate,
} from 'class-validator';
import { Transform } from 'class-transformer';

export enum TransactionSortType {
  name = 'name',
  location_amount = 'location_amount',
  order_creationDate = 'order_creationDate',
  offer_type = 'offer_type',
}

export class FilterOrderDTO {
  @ApiPropertyOptional({ example: 'tomate' })
  @IsString()
  @IsOptional()
  search: string;

  @ApiPropertyOptional({ example: 10 })
  @Transform(take => parseInt(take))
  @IsNumber()
  @IsOptional()
  take: number;

  @ApiPropertyOptional({ example: 5 })
  @Transform(skip => parseInt(skip))
  @IsNumber()
  @IsOptional()
  skip: number;

  @ApiPropertyOptional({ example: 100 })
  @Transform(location_amount => parseInt(location_amount))
  @IsNumber()
  @IsOptional()
  location_amount: number;

  @ApiPropertyOptional({ example: 11 / 3 / 2020 })
  @Transform(created_at => parseInt(created_at))
  @IsDate()
  @IsOptional()
  created_at: Date;

  @ApiPropertyOptional({
    example: 'price',
    enum: Object.keys(TransactionSortType),
  })
  @IsOptional()
  transactionSortType: TransactionSortType;
}
