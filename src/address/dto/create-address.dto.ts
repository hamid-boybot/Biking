import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDTO {
  @ApiProperty({ example: 'mon adresse' })
  name: string;
  @ApiProperty({ example: '7 allee Henri Matisse' })
  street: string;
  @ApiProperty({ example: 'Aubervilliers' })
  city: string;
  @ApiProperty({ example: 'Saint-Denis' })
  state: string;
  @ApiProperty({ example: 'France' })
  country: string;
  @ApiProperty({ example: 93300 })
  zip_code: number; 
}
