import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { OfferRepository } from './offer.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOfferDTO } from './dto/create-offer.dto';
import { UserRepository } from '../user/user.repository';
import { BikeRepository } from '../bike/bike.repository';
import { Offer } from './offer.entity';
import { FilterOfferDTO } from './dto/filter-offer.dto';

@Injectable()
export class OfferService {
  constructor(
    @InjectRepository(OfferRepository)
    private readonly offerRepository: OfferRepository,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @InjectRepository(BikeRepository)
    private readonly bikeRepository: BikeRepository,
  ) {}

  async createOffer(createOfferDTO: CreateOfferDTO, user) {
    const findUser = await this.userRepository.findOne({
      id_user: user.id_user,
    });

    if (findUser.user_checked === false) {
      throw new UnauthorizedException(
        'You need to verify your identity first then you could post properties',
      );
    }
    const {
      name,
      offer_type,

      exchange_availability_start_hour,
      exchange_availability_start_hour_ampm,
      exchange_availability_start_minute,
      exchange_availability_end_hour,
      exchange_availability_end_hour_ampm,
      exchange_availability_end_minute,

      offer_price,
      id_bike,
    } = createOfferDTO;

    const findBike = await this.bikeRepository.findOne({
      id_bike: id_bike,
    });

    if (!findBike) {
      throw new NotFoundException("the Bike n'existe pas");
    }

    const offer = this.offerRepository.create();

    offer.name = name;

    if (exchange_availability_start_hour_ampm === 'AM') {
      offer.exchange_availability_start_hour = exchange_availability_start_hour;
    } else {
      offer.exchange_availability_start_hour =
        exchange_availability_start_hour + 12;
    }
    offer.exchange_availability_start_minute = exchange_availability_start_minute;
    if (exchange_availability_end_hour_ampm === 'AM') {
      offer.exchange_availability_end_hour = exchange_availability_end_hour;
    } else {
      offer.exchange_availability_end_hour =
        exchange_availability_end_hour + 12;
    }

    offer.exchange_availability_end_minute = exchange_availability_end_minute;

    offer.offer_type = offer_type;

    offer.offer_price = offer_price;

    offer.user = findUser;

    offer.bike = findBike;

    try {
      await offer.save();
    } catch (error) {
      console.log(error);
    }

    return offer;
  }

  async deleteOffer(id, user): Promise<{}> {
    return await this.offerRepository.deleteOffer(id, user);
  }

  async getOffers(id_bike, user) {
    const bike = await this.bikeRepository.findOne({ id_bike: id_bike });
    if (!bike) {
      throw new NotFoundException("Nous n'avons pas trouvé cette biciclette");
    }

    const offers = await this.offerRepository.find({ bike: bike });

    return offers;
  }
  async updateOffer(createOfferDTO: CreateOfferDTO, user, id): Promise<Offer> {
    return await this.offerRepository.updateOffer(createOfferDTO, user, id);
  }

  async findOffer() {
    const offers = await this.offerRepository.find();
    console.log('*************************************');
    console.log(offers);
    if (!offers) throw new NotFoundException("the ooffers n'existent pas");
    return offers;
  }

  async findOfferByFilter(filterOfferDTO: FilterOfferDTO, user) {
    return await this.offerRepository.findOffer(filterOfferDTO, user);
  }

  async findOfferLessThanRadius(address, radius) {
    return await this.offerRepository.findOfferLessThanRadius(address, radius);
  }
}
