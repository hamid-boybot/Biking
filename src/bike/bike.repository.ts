import { Repository, EntityRepository } from 'typeorm';
import { Bike, BikeType } from './bike.entity';
import { CreateBikeDTO } from './dto/create-bike.dto';
import { FilterBikeDTO, SortType } from './dto/filter-bike.dto';
import { UnauthorizedException, NotFoundException } from '@nestjs/common';

@EntityRepository(Bike)
export class BikeRepository extends Repository<Bike> {
  async findBike(filterBikeDTO: FilterBikeDTO, user) {
    let { search, bike_type, take, skip, sort, price, city } = filterBikeDTO;
    take = take || 10;
    skip = skip || 0;

    const query = this.createQueryBuilder('bike');

    if (bike_type) {
      query.andWhere('bike.bike_type=:bike_type', {
        bike_type,
      });
    }

    if (price) {
      query.andWhere('bike.estimated_price <= :estimated_price', {
        price,
      });
    }

    if (city) {
      query.andWhere('bike.adress.city ILIKE : city', { city });
    }
    if (search) {
      query.andWhere(
        'bike.name ILIKE :search OR bike.description ILIKE :search',
        { search: `%${search}%` },
      );
    }

    if (sort === SortType.estimated_price) {
      query.orderBy({ 'bike.estimated_price': 'ASC' });
    }

    if (sort === SortType.area) {
      query.orderBy({ 'bike.area': 'ASC' });
    }

    if (sort === SortType.city) {
      query.orderBy({ 'bike.address.city': 'ASC' });
    }

    const bikes: any = await query
      .take(take)
      .skip(skip)
      .getManyAndCount();

    return bikes;
  }

  async getBike(id, user): Promise<{}> {
    let findBike;

    try {
      const query = await this.createQueryBuilder('bike').where(
        'bike.id_bike=:id',
        { id },
      );

      findBike = await query.getOne();
    } catch (error) {
      console.log(error);
      throw new NotFoundException('not found ');
    }

    return findBike;
  }

  // proprieté par agence

  async deleteBike(id, user): Promise<{}> {
    const findBike = await this.findOne({ id_bike: id });

    if (!findBike) {
      throw new NotFoundException('Bike not found');
    }

    const findUser = await this.findOne({
      id_bike: id,
      user: user.id_user,
    });

    if (!findUser) {
      throw new UnauthorizedException(
        'You are not allowed to delete this bike',
      );
    }

    const result = await this.createQueryBuilder()
      .delete()
      .from(Bike)
      .where('id_bike = :id', { id: id })
      // .andWhere('user = :id', { id: user.id_user })
      .execute();

    return result;
  }

  async updateBike(createBikeDto: CreateBikeDTO, user, id): Promise<Bike> {
    const { name, description, pictures, bike_type, price } = createBikeDto;

    const findBike = await this.findOne({ id_bike: id });

    if (!findBike) {
      throw new NotFoundException('Bike not found');
    }

    console.log(user);
    const findUser = await this.findOne({
      id_bike: id,
      user: user.id_user,
    });

    if (!findUser) {
      throw new UnauthorizedException(
        'You are not allowed to update this bike',
      );
    }

    await this.createQueryBuilder()
      .update(Bike)
      .set({
        name: name,
        description: description,
        pictures: pictures,
        bike_type: bike_type,
        price: price,
        user: user,
      })
      .where({ id_bike: id })
      .execute();

    return await this.findOne({ id_bike: id });
  }
}
