import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export enum OfferType {
  daily = 'daily',
  weekly = 'weekly',
  week_end = 'week_end',
  monthly = 'monthly',
}
export enum Hours {
  a = 1,
  b = 2,
  c = 3,
  d = 4,
  e = 5,
  f = 6,
  g = 7,
  h = 8,
  i = 9,
  j = 10,
  k = 11,
  l = 12,
}
export enum Minutes {
  a = 0,
  b = 15,
  c = 30,
  d = 45,
}
export enum AM {
  am = 'AM',
  pm = 'PM',
}
export class CreateOfferDTO {
  @ApiProperty({ example: 'offre ljawda' })
  @IsString()
  name: string;

  @ApiProperty({
    enum: ['daily', 'weekly', 'week_end', 'monthly'],
    example: 'weekly',
  })
  offer_type: OfferType;

  @ApiProperty({
    enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    example: 10,
  })
  exchange_availability_start_hour: Hours;

  @ApiProperty({
    enum: ['AM', 'PM'],
    example: 'AM',
  })
  exchange_availability_start_hour_ampm: AM;

  @ApiProperty({
    enum: [0, 15, 30, 45],
    example: 15,
  })
  exchange_availability_start_minute: Minutes;

  @ApiProperty({
    enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    example: 10,
  })
  exchange_availability_end_hour: Hours;

  @ApiProperty({
    enum: ['AM', 'PM'],
    example: 'AM',
  })
  exchange_availability_end_hour_ampm: AM;

  @ApiProperty({
    enum: [0, 15, 30, 45],
    example: 15,
  })
  exchange_availability_end_minute: Minutes;

  @ApiProperty({ example: 5 })
  @IsNumber()
  offer_price: number;

  @ApiProperty({
    example: '7d1c8b38-b817-4fda-b34a-ea809a355b27',
  })
  @IsString()
  id_bike: string;
}
