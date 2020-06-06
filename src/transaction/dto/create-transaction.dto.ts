import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, Min, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateTransactionDTO {
  @ApiProperty({ example: 'location moyenne durée--Hamid' })
  @IsString()
  name: string;

  @ApiProperty({
    example: new Date(),
  })

  start_date: Date ;

  
  @ApiProperty({
    example: new Date(),
  })

 end_date: Date ;


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

  @ApiPropertyOptional({
    example: 'goodz',
  })
  @IsString()
  feedback: string;
  

  @ApiPropertyOptional()
  @IsBoolean()
  renter_confirmation : boolean ; 

  
  @ApiPropertyOptional()
  @IsBoolean()
  owner_confirmation : boolean ; 

  @ApiProperty({
    example: '7d1c8b38-b817-4fda-b34a-ea809a355b27',
  })
  @IsString()
  id_offer: string;
}
