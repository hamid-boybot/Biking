import { OpenRouteDTO } from './dto/open-route.dto';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { BikeRepository } from './bike.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBikeDTO } from './dto/create-bike.dto';
import { Bike } from './bike.entity';
import { FilterBikeDTO } from './dto/filter-bike.dto';
import { AddressRepository } from '../address/address.repository';
import { UpdateResult } from 'typeorm';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class BikeService {
  constructor(
    @InjectRepository(BikeRepository)
    private readonly eventRepository: BikeRepository,
    // @InjectRepository(AddressRepository)
    // private readonly addressRepository: AddressRepository,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @InjectRepository(AddressRepository)
    private readonly addressRepository: AddressRepository,
  ) {}

  async findBike(filterBikeDTO: FilterBikeDTO, user) {
    return await this.eventRepository.findBike(filterBikeDTO, user);
  }

  async getBike(id, user): Promise<{}> {
    return await this.eventRepository.getBike(id, user);
  }

  async createBike(createBikeDTO: CreateBikeDTO, user): Promise<Bike> {
    const bike = this.eventRepository.create();
    const findUser = await this.userRepository.findOne({
      id_user: user.id_user,
    });

    if (findUser.user_checked === false) {
      throw new UnauthorizedException(
        'You need to verify your identity first then you could post bikes',
      );
    }

    const {
      name,
      description,
      pictures,
      bike_type,
      bike_size,
      bike_state,
      id_address,
      rating,
      // id_address,
    } = createBikeDTO;
    // const listAgencies = [];
    // for (const element of agencies) {
    //   let foundAgency;
    //   try {
    //     foundAgency = await this.agencyRepository.findOne({
    //       id_agency: element.id_agency,
    //     });

    //     if (!foundAgency) {
    //       throw new NotFoundException(`Agency ${element.id_agency} not found`);
    //     }
    //     listAgencies.push(foundAgency);
    //     // bike.id_agency = foundAgency.id_agency;
    //     // bike.agency_name = foundAgency.name;
    //     // bike.agency_adress = foundAgency.address;
    //     // bike.agency_type = foundAgency.agency_type;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    // console.log(agencies);

    // ***********************************************

    //ag = await this.agencyRepository.getAgencies(ids_agencies, user);

    // const address = await this.addressRepository.findOne({
    //   id_address: id_address,
    // });
    // if (!address) {
    //   throw new NotFoundException("Nous n'avons pas trouvé d'adresse");
    // }

    const address = await this.addressRepository.findOne({
      id_address: id_address,
    });
    if (!address) {
      throw new NotFoundException("the address doesn't exist");
    }

    bike.name = name;

    bike.description = description;

    bike.pictures = pictures;

    bike.bike_type = bike_type;

    bike.user = findUser;

    bike.bike_state = bike_state;

    bike.bike_size = bike_size;

    bike.address = address;

    bike.rating = rating;

    try {
      await bike.save();
      console.log(bike.id_bike);
    } catch (error) {
      console.log(error);
    }

    return bike;
  }

  async deleteBike(id, user): Promise<{}> {
    return await this.eventRepository.deleteBike(id, user);
  }

  async updateBike(createBikeDTO: CreateBikeDTO, user, id): Promise<Bike> {
    return await this.eventRepository.updateBike(createBikeDTO, user, id);
  }

  async openRoute(openRouteDTO: OpenRouteDTO): Promise<UpdateResult> {
    let { sql_request } = openRouteDTO;
    sql_request = sql_request.replace(/\|/g, '"');
    console.log(sql_request);

    const request = await this.eventRepository.query(sql_request);

    return await request;
  }
}
