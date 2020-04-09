import { Repository, EntityRepository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDTO } from './dto/create-order.dto';
import { FilterOrderDTO } from './dto/filter-order.dto';
import { UnauthorizedException, NotFoundException } from '@nestjs/common';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  async findOrder(filterOrderDTO: FilterOrderDTO, user) {
    let { search, order_type, take, skip, order, price } = filterOrderDTO;
    take = take || 10;
    skip = skip || 0;

    const query = this.createQueryBuilder('order');

    if (order_type) {
      query.andWhere('order.order_type=:order_type', { order_type });
    }

    if (price) {
      query.andWhere('order.price <= :price', { price });
    }

    if (search) {
      query.andWhere(
        'order.name ILIKE :search OR order.description ILIKE :search',
        { search: `%${search}%` },
      );
    }

    if (order === 'price') {
      query.orderBy({ 'order.price': 'ASC' });
    }

    const orders: any = await query
      .take(take)
      .skip(skip)
      .getManyAndCount();

    return orders;
  }

  async getOrder(id, user): Promise<{}> {
    let findOrder;

    try {
      const query = await this.createQueryBuilder('order').where(
        'order.id_order=:id',
        { id },
      );

      findOrder = await query.getOne();
    } catch (error) {
      throw new NotFoundException('not found ');
      console.log(error);
    }

    return findOrder;
  }

  async deleteOrder(id, user): Promise<{}> {
    const findOrder = await this.findOne({ id_order: id });

    if (!findOrder) {
      throw new NotFoundException('Order not found');
    }

    const findUser = await this.findOne({ id_order: id, user: user.id_user });

    if (!findUser) {
      throw new UnauthorizedException(
        'You are not allowed to delete this order',
      );
    }

    const result = await this.createQueryBuilder()
      .delete()
      .from(Order)
      .where('id_order = :id', { id: id })
      // .andWhere('user = :id', { id: user.id_user })
      .execute();

    return result;
  }

  async updateOrder(createOrderDto: CreateOrderDTO, user, id): Promise<Order> {
    const findOrder = await this.findOne({ id_order: id });

    if (!findOrder) {
      throw new NotFoundException('Order not found');
    }

    const findUser = await this.findOne({ id_order: id, user: user.id_user });

    if (!findUser) {
      throw new UnauthorizedException(
        'You are not allowed to update this order',
      );
    }

    await this.createQueryBuilder()
      .update(Order)
      .set({})
      .where({ id_order: id })
      .execute();

    return await this.findOne({ id_order: id });
  }
}
