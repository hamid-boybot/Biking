import { Repository, EntityRepository, getRepository } from 'typeorm';
import { Offer } from './offer.entity';
import { CreateOfferDTO } from './dto/create-offer.dto';
import { FilterOfferDTO } from './dto/filter-offer.dto';
import { Address } from '../address/address.entity';
import { Bike } from '../bike/bike.entity';

import { UnauthorizedException, NotFoundException } from '@nestjs/common';

@EntityRepository(Offer)
export class OfferRepository extends Repository<Offer> {
  // async addressesMatch(startAddress: Address, radius) {
  //   const addresses = await getRepository(Address).find();

  //   let addresses_ids = [];
  //   const x = startAddress.lat;
  //   const y = startAddress.lng;

  //   for (let address of addresses) {
  //     let x_new = address.lat;
  //     let y_new = address.lng;

  //     let distance = Math.sqrt(Math.pow(x - x_new, 2) + Math.pow(y - y_new, 2));
  //     if (distance < radius) {
  //       addresses_ids.push(address.id_address);
  //     }
  //   }
  //   return addresses_ids;
  // }

  // async getBikes(addresses) {
  //   let bikes = [];

  //   for (let address of addresses) {
  //     const bike = await getRepository(Bike).findOne({
  //       address: { id_address: address },
  //     });
  //     bikes.push(bike.id_bike);
  //   }
  //   return bikes;
  // }

  // async findOffersByBikes(bikes) {
  //   let offers = [];
  //   for (let bike of bikes) {
  //     const offers_tmp = await this.find({ bike: { id_bike: bike } });
  //     if (offers_tmp) {
  //       for (let offer of offers_tmp) {
  //         offers.push(offer);
  //       }
  //     }
  //   }

  //   return offers;
  // }

  // async findOfferLessThanRadius(address, radius) {
  //   const addresses = this.addressesMatch(address, radius);

  //   const bikes = this.getBikes(addresses);
  //   const offers_n = this.findOffersByBikes(bikes);
  //   console.log(offers_n);
  //   return offers_n;
  // }

  async findOfferbyMonth(month) {
    let offers = [];
    const offersList = await this.find();
    for (let offer of offersList) {
      if (offer.offer_availability_months[month - 1] === 1) {
        offers.push(offer);
      }
    }

    return offers;
  }

  async findOffer(filterOfferDTO: FilterOfferDTO, user) {
    let {
      city,
      //search,

      offer_type,

      offer_price,
      take,
      skip,
    } = filterOfferDTO;
    take = take || 10;
    skip = skip || 0;

    const query = this.createQueryBuilder('offer');

    if (city) {
      query.andWhere('offer.bike.adress.city=:city', { city });
    }

    if (offer_type) {
      query.andWhere('offer.offer_type=:offer_type', { offer_type });
    }

    if (offer_price) {
      query.andWhere('offer.offer_price <= :offer_price', { offer_price });
    }

    // if (search) {
    //   query.andWhere(
    //     'offer.name ILIKE :search OR offer.description ILIKE :search',
    //     { search: `%${search}%` },
    //   );
    // }

    const offers: any = await query
      .take(take)
      .skip(skip)
      .getManyAndCount();

    return offers;
  }

  // async getOffers(id, user): Promise<{}> {

  //   let findOffer;
  //   const findUser = await this.findOne({ user: user.id_user });
  //   if (!findUser) {
  //     throw new UnauthorizedException(
  //       'You are not allowed to get the list of offers',
  //     );
  //   }

  //   for (var i = 0; i < ids.length; i++) {
  //     let id = ids[i];
  //     try {
  //       const query = await this.createQueryBuilder('bike').where(
  //         'bike.id_bike=:id',
  //         { id },
  //       );
  //       findOffer = await query.getOne();
  //     } catch (error) {
  //       console.log(error);
  //       throw new NotFoundException('Offer not found ');
  //     }
  //     findOfferListIds[i] = findOffer;
  //   }

  //   return findOfferListIds;
  // }

  async getOffer(id, user): Promise<{}> {
    let findOffer;

    try {
      const query = await this.createQueryBuilder('offer').where(
        'offer.id_offer=:id',
        { id },
      );

      findOffer = await query.getOne();
    } catch (error) {
      throw new NotFoundException('not found ');
      //console.log(error);
    }

    return findOffer;
  }

  async deleteOffer(id, user): Promise<{}> {
    console.log(id, user);
    const findOffer = await this.findOne({ id_offer: id });

    if (!findOffer) {
      throw new NotFoundException('Offer not found');
    }

    const findUser = await this.findOne({ id_offer: id, user: user.id_user });

    if (!findUser) {
      throw new UnauthorizedException(
        'You are not allowed to delete this offer',
      );
    }

    const result = await this.createQueryBuilder()
      .delete()
      .from(Offer)
      .where('id_offer = :id', { id: id })
      // .andWhere('user = :id', { id: user.id_user })
      .execute();

    return result;
  }

  async updateOffer(createOfferDto: CreateOfferDTO, user, id): Promise<Offer> {
    const { name, offer_type } = createOfferDto;

    const findOffer = await this.findOne({ id_offer: id });

    if (!findOffer) {
      throw new NotFoundException('Offer not found');
    }

    console.log(user);
    const findUser = await this.findOne({ id_offer: id, user: user.id_user });

    if (!findUser) {
      throw new UnauthorizedException(
        'You are not allowed to update this Offer',
      );
    }

    await this.createQueryBuilder()
      .update(Offer)
      .set({
        name: name,

        offer_type: offer_type,
      })
      .where({ id_offer: id })
      .execute();

    return await this.findOne({ id_offer: id });
  }
}
