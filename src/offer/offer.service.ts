import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { OfferRepository } from './offer.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOfferDTO } from './dto/create-offer.dto';
import { UserRepository } from '../user/user.repository';
import { Offer } from './offer.entity';
import { FilterOfferDTO } from './dto/filter-offer.dto';

@Injectable()
export class OfferService {
  constructor(
    @InjectRepository(OfferRepository)
    private readonly offerRepository: OfferRepository,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
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

    const findBike = await this.bikeRepository.findOne({
      id_bike: user.id_bike,
    });

    if (!findBike) {
      throw new NotFoundException("the Bike n'existe pas");
    }

    const {
      name,
      description,
      address,
      offer_type,
      hour_plage,
    } = createOfferDTO;

    const offer = this.offerRepository.create();

    offer.name = name;

    offer.description = description;

    offer.address = address;

    offer.offer_type = offer_type;

    offer.hour_plage = hour_plage;

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

    const offers = await this.orderRepository.find({ bike: bike });

    return offers;
  }
  async updateOffer(createOfferDTO: CreateOfferDTO, user, id): Promise<Offer> {
    return await this.offerRepository.updateOffer(createOfferDTO, user, id);
  }

  async findOffer() {
    return await this.offerRepository.find();
  }
}
