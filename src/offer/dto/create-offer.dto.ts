import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export enum OfferType {
  daily = 'daily',
  weekly = 'weekly',
  week_end = 'week_end',
  monthly = 'monthly',
  perso = 'perso',
}

export class CreateOfferDTO {
  @ApiProperty({ example: 'virtual-Immo' })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'description',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 'Aubervillier, 93300',
  })
  @IsString()
  address: string;

  @ApiProperty({
    enum: ['daily', 'weekly', 'week_end', 'monthly', 'perso'],
    example: 'weekly',
  })
  offer_type: OfferType;

  @ApiProperty({ example: '9h00-20h00' })
  @IsString()
  hour_plage: string;

  @ApiProperty({ example: 5 })
  @IsNumber()
  price_per_day: number;

  @ApiProperty({
    example: '7d1c8b38-b817-4fda-b34a-ea809a355b27',
  })
  @IsString()
  id_bike: string;
}
