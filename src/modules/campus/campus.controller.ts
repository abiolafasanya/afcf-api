import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CampusService } from './campus.service';
import { Public } from 'src/common/decorators/public.decorator';
import { CreateCampusDto } from './dto/create-campus-dto';
import { TransactionParam } from 'src/common/decorators/transaction-param.decorator';
import { Transaction } from 'sequelize';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { UpdateCampusDto } from './dto/update-campus-dto';

@Controller('campus')
export class CampusController {
  constructor(private readonly campusService: CampusService) {}

  @Public()
  @Get('')
  @ResponseMessage('Campus Records')
  async getAllCampus() {
    return this.campusService.findAllCampus();
  }

  @Public()
  @Get(':campusId')
  @ResponseMessage('Campus Records')
  async getCampus(@Param("campusId") campusId) {
    return this.campusService.findCampus(campusId);
  }

  @Public()
  @Post('')
  @ResponseMessage('Campus Record Created')
  async createCampus(
    @Body() createCampusDto: CreateCampusDto,
    @TransactionParam() transaction: Transaction,
  ) {
    return this.campusService.create(createCampusDto, transaction);
  }

  @Public()
  @Delete(':campusId')
  @ResponseMessage('Campus has been deleted')
  async deleteCampus(
    @Param('campusId') campusId: string,
    @TransactionParam() transaction: Transaction,
  ) {
    return this.campusService.delete(campusId, transaction);
  }

  @Public()
  @Put(':campusId')
  @ResponseMessage('Campus has been updated')
  async updateCampus(
    @Param('campusId') campusId: string,
    @TransactionParam() transaction: Transaction,
    @Body() updateCampusDto: UpdateCampusDto
  ) {
    return this.campusService.update(campusId, updateCampusDto, transaction);
  }
}
