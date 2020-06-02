import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateTransactionDTO {
  @ApiProperty({ example: 'location moyenne durée--Hamid' })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'lundi-vendredi',
  })
  @IsString()
  hour_plage: string;

  @ApiProperty({
    example: 20,
  })
  @IsNumber()
  location_amount: number;

  @ApiProperty({
    example: 'en attente',
  })
  @IsString()
  state: string;

  @ApiProperty({
    example: '7d1c8b38-b817-4fda-b34a-ea809a355b27',
  })
  @IsString()
  id_offer: string;

  @ApiProperty({
    example: '7d1c8b38-b817-4fda-b34a-ea809a355b27',
  })
  @IsString()
  id_user_buyer: string;
}
