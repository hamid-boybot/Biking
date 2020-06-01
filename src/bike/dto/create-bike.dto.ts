import { Delete } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min, IsArray } from 'class-validator';
import { Transform } from 'class-transformer';
//import { IsString } from 'util';

const address = {
  name: 'mon adresse',
  street: '7 allee Henri Matisse',
  city: 'Aubervilliers',
  state: 'Saint-Denis',
  country: 'France',
  zip_code: 93300,
};

// const agencies = [
//   {
//     agency_name: 'ImmoTeps',
//     id_agency: 'b7e2a2cb-ee25-4381-a2c5-d03634a7e7ca',
//     agency_type: 'physic',
//     agency_adress: '16eme, 93300',
//   },
//   {
//     name: 'ImmoTeps15',
//     id_agency: '8270a616-6ba1-42f6-a3bb-fb86314de3f3',
//     agency_type: 'physic',
//     adress: '15eme, 93300',
//   },
// ];
export enum BikeType {
  rapide = 'rapide',
  efficace = 'efficace',
  pascher = 'pascher',
}

export class CreateBikeDTO {
  @ApiProperty({ example: '3oud ri7' })
  @IsString()
  name: string;

  @ApiProperty({
    example: [
      'https://static.actu.fr/uploads/2019/07/AdobeStock_90990567-854x568.jpeg',
      'https://static.actu.fr/uploads/2019/07/AdobeStock_90990567-854x568.jpeg',
      'https://static.actu.fr/uploads/2019/07/AdobeStock_90990567-854x568.jpeg',
    ],
  })
  @IsArray()
  pictures: string[];

  @ApiProperty({
    example:
      'Homines enim eruditos et sobrios ut infaustos et inutiles vitant, eo quoque accedente quod et nomenclatores adsueti haec et talia venditare, mercede accepta lucris quosdam et prandiis inserunt subditicios ignobiles et obscuros. At nunc si ad aliquem bene nummatum tumentemque ideo honestus advena salutatum introieris, primitus tamquam exoptatus suscipieris et interrogatus multa coactusque mentiri, miraberis numquam antea visus summatem virum tenuem te sic enixius observantem, ut paeniteat ob haec bona tamquam praecipua non vidisse ante decennium Romam.Victus universis caro ferina est lactisque abundans copia qua sustentantur, et herbae multiplices et siquae alites capi per aucupium possint, et plerosque mos vidimus frumenti usum et vini penitus ignorantes.',
  })
  @IsString()
  description: string;

  @ApiProperty({
    enum: ['rapide', 'efficace', 'pascher'],
    example: 'apartment',
  })
  bike_type: BikeType;

  @ApiProperty({ example: 100000 })
  @Transform(price => parseInt(price))
  @IsNumber()
  @Min(0)
  price: number;

  // @ApiProperty({ example: 100 })
  // @Transform(area => parseInt(area))
  // @IsNumber()
  // @Min(0)
  // area: number;

  @ApiProperty({ example: 10 })
  @Transform(age => parseInt(age))
  @IsNumber()
  @Min(0)
  age: number;

  @ApiProperty({ example: address })
  address: {
    name: string;
    street: string;
    city: string;
    state: string;
    zip_code: number;
    lat: number;
    lng: number;
  };

  // @ApiProperty({
  //   example: 'id_address',
  // })
  // @IsString()
  // id_address: string;

  // @ApiProperty({
  //   example: agencies,
  // })
  // agencies: [
  //   {
  //     agency_name: string;
  //     id_agency: string;
  //     agency_type: string;
  //     agency_adress: string;
  //   }
  // ];
}
