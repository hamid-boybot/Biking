import { Repository, EntityRepository } from 'typeorm';
import { Offer } from './offer.entity';
import { CreateOfferDTO } from './dto/create-offer.dto';
import { FilterOfferDTO } from './dto/filter-offer.dto';

import { UnauthorizedException, NotFoundException } from '@nestjs/common';

@EntityRepository(Offer)
export class OfferRepository extends Repository<Offer> {
  async findOffer(filterOfferDTO: FilterOfferDTO, user) {
    let {
      address,
      search,
      offer_type,
      hour_plage,
      take,
      skip,
    } = filterOfferDTO;
    take = take || 10;
    skip = skip || 0;

    const query = this.createQueryBuilder('offer');

    if (address) {
      query.andWhere('offer.address=:address', { offer_type });
    }

    if (hour_plage) {
      query.andWhere('offer.hour_plage=:hour_plage', { hour_plage });
    }
    if (offer_type) {
      query.andWhere('offer.offer_type=:offer_type', { offer_type });
    }

    if (search) {
      query.andWhere(
        'offer.name ILIKE :search OR offer.description ILIKE :search',
        { search: `%${search}%` },
      );
    }

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
    const { name, description, offer_type, hour_plage } = createOfferDto;

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
        description: description,
        offer_type: offer_type,
        hour_plage: hour_plage,
      })
      .where({ id_offer: id })
      .execute();

    return await this.findOne({ id_offer: id });
  }
}
