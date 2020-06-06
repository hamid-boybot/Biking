import { Delete } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min, IsArray } from 'class-validator';
import { Transform } from 'class-transformer';
//import { IsString } from 'util';

// const address = {
//   name: 'mon adresse',
//   street: '7 allee Henri Matisse',
//   city: 'Aubervilliers',
//   state: 'Saint-Denis',
//   country: 'France',
//   zip_code: 93300,
// };

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
    enum: [
      'vélo tout chemin',
      'vélo tout terrain',
      'vélo de ville',
      'vélo de route',
      'vélo à assistance électrique',
      'VTT à assistance electrique',
    ],
    example: 'vélo tout chemin',
  })
  bike_type: BikeType;

  @ApiProperty({
    enum: ['bon', 'moyen', 'neuf'],
    example: 'moyen',
  })
  bike_state: BikeState;

  @ApiProperty({
    enum: ['Adulte M', 'Adulte L', 'Adulte XL', 'Enfant'],
    example: 'Adulte M',
  })
  bike_size: BikeSize;

  // @ApiProperty({ example: 100 })
  // @Transform(area => parseInt(area))
  // @IsNumber()
  // @Min(0)
  // area: number;


  
  // @ApiProperty({ example: 'id_address' })
  // @IsString()
  // id_address: string;

  @ApiProperty({ example: 3 })
  @IsNumber()
  rating: number;

  // @ApiProperty({ example: address })
  // address: {
  //   name: string;
  //   street: string;
  //   city: string;
  //   state: string;
  //   zip_code: number;
  //   lat: number;
  //   lng: number;
  // };

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
