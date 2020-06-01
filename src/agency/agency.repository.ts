import { Repository, EntityRepository } from 'typeorm';
import { Offer } from './offer.entity';
import { CreateOfferDTO } from './dto/create-offer.dto';
import { FilterOfferDTO } from './dto/filter-offer.dto';

import { UnauthorizedException, NotFoundException } from '@nestjs/common';

@EntityRepository(Offer)
export class AgencyRepository extends Repository<Agency> {
  async findOffer(filterAgencyDTO: FilterOfferDTO, user) {
    let { address, search, agency_type, hour, take, skip } = filterAgencyDTO;
    take = take || 10;
    skip = skip || 0;

    const query = this.createQueryBuilder('agency');

    if (address) {
      query.andWhere('agency.address=:address', { agency_type });
    }

    if (hour) {
      query.andWhere('agency.hour=:hour', { hour });
    }
    if (agency_type) {
      query.andWhere('agency.agency_type=:agency_type', { agency_type });
    }

    if (search) {
      query.andWhere(
        'agency.name ILIKE :search OR agency.description ILIKE :search',
        { search: `%${search}%` },
      );
    }

    const agencies: any = await query
      .take(take)
      .skip(skip)
      .getManyAndCount();

    return agencies;
  }

  async getAgencies(ids, user): Promise<{}> {
    let findAgencyListIds = new Array(ids.length);
    let findAgency;
    const findUser = await this.findOne({ user: user.id_user });
    if (!findUser) {
      throw new UnauthorizedException(
        'You are not allowed to get the list of agencies',
      );
    }

    for (var i = 0; i < ids.length; i++) {
      let id = ids[i];
      try {
        const query = await this.createQueryBuilder('product').where(
          'product.id_product=:id',
          { id },
        );
        findAgency = await query.getOne();
      } catch (error) {
        console.log(error);
        throw new NotFoundException('Agency not found ');
      }
      findAgencyListIds[i] = findAgency;
    }

    return findAgencyListIds;
  }

  async deleteAgency(id, user): Promise<{}> {
    console.log(id, user);
    const findAgency = await this.findOne({ id_agency: id });

    if (!findAgency) {
      throw new NotFoundException('Agency not found');
    }

    const findUser = await this.findOne({ id_agency: id, user: user.id_user });

    if (!findUser) {
      throw new UnauthorizedException(
        'You are not allowed to delete this agency',
      );
    }

    const result = await this.createQueryBuilder()
      .delete()
      .from(Agency)
      .where('id_agency = :id', { id: id })
      // .andWhere('user = :id', { id: user.id_user })
      .execute();

    return result;
  }

  async updateAgency(
    createAgencyDto: CreateAgencyDTO,
    user,
    id,
  ): Promise<Agency> {
    const { name, description, picture, agency_type, hour } = createAgencyDto;

    const findAgency = await this.findOne({ id_agency: id });

    if (!findAgency) {
      throw new NotFoundException('Agency not found');
    }

    console.log(user);
    const findUser = await this.findOne({ id_agency: id, user: user.id_user });

    if (!findUser) {
      throw new UnauthorizedException(
        'You are not allowed to update this Agency',
      );
    }

    await this.createQueryBuilder()
      .update(Agency)
      .set({
        name: name,
        description: description,
        picture: picture,
        agency_type: agency_type,
        hour: hour,
      })
      .where({ id_agency: id })
      .execute();

    return await this.findOne({ id_agency: id });
  }
}
