import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, Min, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export enum OfferType {
  daily = 'daily',
  weekly = 'weekly',
  week_end = 'week_end',
  monthly = 'monthly',
  perso = 'perso',
}

export class FilterOfferDTO {
  @ApiPropertyOptional({
    example: '7 boulevard kennedy 75016',
  })
  @IsOptional()
  @IsString()
  address: string;

  @ApiPropertyOptional({ example: '16ème arrondissement' })
  @IsOptional()
  @IsString()
  search: string;

  @ApiPropertyOptional({ example: '9h-20h' })
  @IsOptional()
  @IsString()
  hour: string;

  @ApiPropertyOptional({
    enum: ['daily', 'weekly', 'week_end', 'monthly', 'perso'],
    example: 'weekly',
  })
  @IsOptional()
  offer_type: OfferType;

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
}
