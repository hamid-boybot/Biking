import { OpenRouteDTO } from './dto/open-route.dto';
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
import { CreateBikeDTO } from './dto/create-bike.dto';
import { BikeService } from './bike.service';
import { Bike } from './bike.entity';
import {
  ApiTags,
  ApiBearerAuth,
  ApiBike,
  ApiParam,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { getUser } from '../common/decorators/get-user.decorator';
import { FilterBikeDTO } from './dto/filter-bike.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

@ApiBearerAuth()
@ApiTags('Bike')
@Controller('bike')
export class BikeController {
  constructor(private bikeService: BikeService) {}

  @Get('/search')
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({
    description: 'return the bikes corresponding to the search parameters',
  })
  async findBike(@Query() filterBikeDTO: FilterBikeDTO, @getUser() user) {
    return await this.bikeService.findBike(filterBikeDTO, user);
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id' })
  async getBike(@Param('id') id, @getUser() user): Promise<{}> {
    return await this.bikeService.getBike(id, user);
  }

  @Put('/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id' })
  async updateBike(
    @Body() createBikeDto: CreateBikeDTO,
    @getUser() user,
    @Param('id') id,
  ): Promise<Bike> {
    return await this.bikeService.updateBike(createBikeDto, user, id);
  }

  @Post()
  //@Roles('admin')
  //@UseGuards(AuthGuard('jwt'), RolesGuard)
  @UseGuards(AuthGuard('jwt'))
  async createBike(
    @Body() createBikeDto: CreateBikeDTO,
    @getUser() user,
  ): Promise<Bike> {
    return await this.bikeService.createBike(createBikeDto, user);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id' })
  async deleteBike(@Param('id') id, @getUser() user): Promise<{}> {
    return await this.bikeService.deleteBike(id, user);
  }

  @Post('/test')
  @UseGuards(AuthGuard('jwt'))
  async openRoute(@Body() openRouteDTO: OpenRouteDTO) {
    return await this.bikeService.openRoute(openRouteDTO);
  }
}
