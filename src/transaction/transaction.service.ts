import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository, EntityRepository, getRepository } from 'typeorm';
import { Equal } from 'typeorm';

import { CreateTransactionDTO } from './dto/create-transaction.dto';
import { Transaction } from './transaction.entity';
import { TransactionRepository } from './transaction.repository';

import { FilterTransactionDTO } from './dto/filter-transaction.dto';
import { OfferRepository } from '../offer/offer.repository';
import { UpdateResult } from 'typeorm';
import { UserRepository } from '../user/user.repository';
import { User } from '../user/user.entity';
import { Offer } from '../offer/offer.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionRepository)
    private readonly transactionRepository: TransactionRepository,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @InjectRepository(OfferRepository)
    private readonly offerRepository: OfferRepository,
  ) {}

  async getTransactions(id_offer, user) {
    const offer = await this.offerRepository.findOne({ id_offer: id_offer });
    if (!offer) {
      throw new NotFoundException("Nous n'avons pas trouvé cette offre");
    }

    const transactions = await this.transactionRepository.find({
      offer: offer,
    });

    return transactions;
  }

  async findTransaction(filterTransactionDTO: FilterTransactionDTO, user) {
    return await this.transactionRepository.findTransaction(
      filterTransactionDTO,
      user,
    );
  }

  async getTransaction(id, user): Promise<{}> {
    return await this.transactionRepository.getTransaction(id, user);
  }

  // async getTransactionOfferUser() {
  //   const offer = await this.offerRepository.findOne();
  //   if (!offer) {
  //     throw new NotFoundException("Nous n'avons pas trouvé cette offre");
  //   }

  //   const offerOwner = offer.userRepository.findOne();
  //   if (!offerOwner) {
  //     throw new NotFoundException('owner of this offer is not here');
  //   }
  //   return offerOwner;
  // }

  async createTransaction(
    createTransactionDTO: CreateTransactionDTO,
    user: User,
  ): Promise<Transaction> {
    /*   const findUser = await this.userRepository.findOne({
      id_user: user.id_user,
    });
    if (findUser.user_checked === false) {
      throw new UnauthorizedException(
        'You need to verify your identity first then you could post orders',
      );
    }
 */

    const transaction = this.transactionRepository.create();

    const findUser = await this.userRepository.findOne({
      id_user: user.id_user,
    });

    if (findUser.user_checked === false) {
      throw new UnauthorizedException(
        'You need to verify your identity first then you could post transactions',
      );
    }

    const {
      name,
      state,
      hour_plage,
      location_amount,
      id_offer,
    } = createTransactionDTO;

    const offer = await this.offerRepository.findOne({ id_offer: id_offer });
    if (!offer) {
      throw new NotFoundException("Nous n'avons pas trouvé cette offre");
    }

    // const products = order.orderDetails;

    /*    const products = [
      {
        price: 10,
        id_product: 'f3ce7082-dd03-4c3e-a9f1-95328a322d2d',
        quantity: 3,
        product_name: 'Papier toillette',
      },
      {
        price: 2,
        id_product: '346ef192-885a-4fab-bef3-61f2f4f9cf90',
        quantity: 2,
        product_name: 'banane',
      },
    ]; */

    transaction.name = name;
    transaction.location_amount = location_amount;
    transaction.state = state;
    transaction.hour_plage = hour_plage;
    transaction.offer = offer;
    transaction.user = findUser;

    // let computed_amount = 0;
    // let savedOrder;
    // for (const element of products) {
    //   let foundProduct;
    //   try {
    //     foundProduct = await this.productRepository.findOne({
    //       id_product: element.id_product,
    //     });

    //     if (!foundProduct) {
    //       throw new NotFoundException(
    //         `Produit ${element.product_name} not found`,
    //       );
    //     }
    //     computed_amount =
    //       computed_amount + foundProduct.price * element.quantity;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }

    // if (computed_amount !== order_amount) {
    //   throw new NotFoundException(
    //     `Probleme with the verification of the computed amount `,
    //   );
    // }

    // order.order_amount = computed_amount;

    // try {
    //   savedOrder = await order.save();
    //   console.log(savedOrder);
    // } catch (error) {
    //   console.log(error);
    // }

    // for (const element of products) {
    //   let orderDetail = await this.orderDetailRepository.create();

    //   let foundProduct = await this.productRepository.findOne({
    //     id_product: element.id_product,
    //   });

    //   /* <fullfil BdD entity>  ******/
    //   /*    <BDD relation> */
    //   orderDetail.order = savedOrder;
    //   orderDetail.id_product = foundProduct.id_product;
    //   console.log(foundProduct.name);
    //   //    </BDD relation> */
    //   //    <Recup de prop Objet>
    //   orderDetail.product_name = foundProduct.name;
    //   orderDetail.price = foundProduct.price;
    //   orderDetail.measure = foundProduct.measure_type;
    //   //   </Recup de prop Objet>
    //   // ce que le front nous envoi mais qu'on a pas et qu'on a besoin
    //   //
    //   orderDetail.quantity = element.quantity;
    //   /* </fullfil BdD entity>  ******/
    //   try {
    //     await orderDetail.save();
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }

    let savedTransaction;

    try {
      savedTransaction = await transaction.save();
      console.log(savedTransaction);
    } catch (error) {
      console.log(error);
    }

    return savedTransaction;
  }

  async deleteTransaction(id, user): Promise<{}> {
    return await this.transactionRepository.deleteTransaction(id, user);
  }

  async updateTransaction(
    createTransactionDTO: CreateTransactionDTO,
    user,
    id,
  ): Promise<Transaction> {
    // const loadedPosts = await connection.getRepository(Post).find({
    //     title: Equal("About #2")
    // });
    //     ****
    const transaction = await this.transactionRepository.findOne({
      id_transaction: id,
    });

    console.log('la transaction **************');
    console.log(transaction);

    // const offer1 = await getRepository(Transaction)
    //   .createQueryBuilder('transaction')
    //   .select('offer')
    //   .where('transaction.id_transaction = :id', { id_transaction: id })
    //   .getRawOne();
    // // const offer2 = await this.transactionRepository.findOne({
    // //   transactions : transaction,
    // // });
    // console.log("l'offre est ..... " + offer1);
    // const owner = await this.userRepository.findOne({
    //   relations: ['offers'],
    //   where: { offer: offer1 },
    // });
    // console.log('the owner .....' + owner);
    // const userrr = await this.userRepository.findOne({
    //   relations: ['transactions'],
    //   where: { id_transaction: id },
    // });
    // console.log('the moul transaction is' + userrr);4

    let user1 = await this.userRepository.findOne({
      id_user: user.id_user,
    });
    console.log('the user is');
    console.log(user1);

    console.log('the offer is ');
    let offer = transaction.offer;
    console.log(offer);

    let offerOwner = offer.user;
    let offerOwnerId = offerOwner.id_user;
    console.log('the owner is');
    console.log(offerOwnerId);
    console.log(offerOwner);

    // const offer1 = await Offer.findOne({
    //   where: { transactions: { id_transaction: transaction.id_transaction } },
    // });
    // if (!offer1) {
    //   throw new NotFoundException("Nous n'avons pas trouvé cette offre");
    // }
    // const owner = await User.findOne({
    //   where: { offer: { id_offer: offer1.id_offer } },
    // });
    // //const offerOwner = offer.userRepository.find({ select: 'id_user' });
    //* **************************
    // const foundUser = await User.findOne({
    //   where: { transactions: { id_transaction: transaction.id_transaction } },
    // });

    // if (foundUser.user_checked === false) {
    //   throw new UnauthorizedException(
    //     'You need to verify your identity first then you could post transactions',
    //   );
    // }
    // console.log('offer is' + offer1);
    // console.log('the owner is :' + owner[0]);
    // console.log('the user is :' + foundUser[0]);

    // if (owner !== user) {
    //   throw new NotFoundException('you are not the owner');
    // }

    return await this.transactionRepository.updateTransaction(
      createTransactionDTO,
      user,
      id,
    );
  }
}
