import {
  Controller,
  Post,
  Param,
  Body,
  Get,
  UseGuards,
  Query,
  Delete,
  Put,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiParam,
  ApiOkResponse,
} from '@nestjs/swagger';
import { OfferService } from './offer.service';
import { Offer } from './offer.entity';
import { AuthGuard } from '@nestjs/passport';
import { getUser } from '../common/decorators/get-user.decorator';
import { CreateOfferDTO } from './dto/create-offer.dto';
import { FilterOfferDTO } from './dto/filter-offer.dto';

@ApiBearerAuth()
@ApiTags('Offer')
@Controller('offer')
export class OfferController {
  constructor(private offerService: OfferService) {}

  @Get('/')
  async findOffer() {
    return await this.offerService.findOffer();
  }

  @Post()
  //@Roles('admin')
  //@UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseGuards(AuthGuard('jwt'))
  async createOffer(
    @Body() createOffertDto: CreateOfferDTO,
    @getUser() user,
  ): Promise<Offer> {
    return await this.offerService.createOffer(createOffertDto, user);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id' })
  async deleteOffer(@Param('id') id, @getUser() user) {
    return await this.offerService.deleteOffer(id, user);
  }

  @Put('/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id' })
  async updateOffer(
    @Body() createOfferDto: CreateOfferDTO,
    @getUser() user,
    @Param('id') id,
  ): Promise<Offer> {
    return await this.offerService.updateOffer(createOfferDto, user, id);
  }

  /*  @Get('/search')
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({
    description: 'return the properties corresponding to the search parameters',
  })
  async findOffer(@Query() filterOfferDTO: FilterOfferDTO, @getUser() user) {
    return await this.offerService.findOffer(filterOfferDTO, user);
  } */
}
