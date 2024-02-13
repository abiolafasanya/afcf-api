import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCampusDto } from './dto/create-campus-dto';
import { Transaction } from 'sequelize';
import { CampusRepository } from './repositories/campus.repository';
import { Op } from 'sequelize';
import { ICreateCampus, IUpdateCampus } from './interfaces/campus.interface';
import { UpdateCampusDto } from './dto/update-campus-dto';
import { CampusModel } from './models/campus.model';

@Injectable()
export class CampusService {
  constructor(
    private readonly campusRepository: CampusRepository,
  ) {}

  async create(createCampusDto: CreateCampusDto, transaction: Transaction) {
    const { campusName } = createCampusDto;

    const campus = await this.campusRepository.findOne({
      [Op.or]: [{ campusName }],
    });

    if (campus) throw new BadRequestException('Campus already exists');

    const payload: ICreateCampus = {
      ...createCampusDto,
      pastorEmail: createCampusDto.pastorEmail.toLowerCase(),
      campusId: this.generateUniqueCodes(),
    };

    const campusData = await this.campusRepository.create(payload, transaction);

    const { ...data } = campusData.toJSON();

    return data;
  }

  async findAllCampus(campusId: string) {
    let campus: CampusModel[];
    if (campusId) {
      campus = await this.campusRepository.findAll({
        [Op.or]: [{ campusId }],
      });
    } else {
      campus = await this.campusRepository.findAll();
    }

    if (!campus || campus.length === 0)
      throw new NotFoundException('No record found!');
    return campus.map((campus) => campus.toJSON());
  }

  async findCampus(campusId: string) {
    const campus = await this.campusRepository.findOne({
      campusId,
    });

    if (!campus) throw new NotFoundException('No record found!');
    const { ...data } = campus.toJSON();
    return data;
  }

  async update(
    campusId: string,
    updateCampusDto: UpdateCampusDto,
    transaction: Transaction,
  ) {
    const campus = await this.campusRepository.findOne({
      [Op.or]: [{ campusId }],
    });

    if (!campus) throw new BadRequestException('Campus not found');

    const payload: IUpdateCampus = {
      ...updateCampusDto,
    };

    const updateCampus = await this.campusRepository.update(
      { id: campus.id },
      payload,
      transaction,
    );

    if (!updateCampus) throw new BadRequestException('Update Operation Failed');

    return;
  }

  async delete(campusId: string, transaction: Transaction) {
    const campus = await this.campusRepository.findOne({
      [Op.or]: [{ campusId }],
    });
    if (!campus) throw new NotFoundException('Campus not found');
    const removeCampus = await this.campusRepository.delete(
      {
        [Op.or]: [{ id: campus.id }],
      },
      transaction,
    );
    if (!removeCampus) throw new BadRequestException('Operation failed');
    return;
  }

  generateUniqueCodes() {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let uniqueCode = '';
    for (let i = 0; i < 6; i++) {
      uniqueCode += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    return 'AFCF' + uniqueCode;
  }
}
