import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCampusDto } from './dto/create-campus-dto';
import { Transaction } from 'sequelize';
import { CampusRepository } from './repositories/campus.repository';
import { ICreateCampus, IUpdateCampus } from './interfaces/campus.interface';
import { UpdateCampusDto } from './dto/update-campus-dto';
import { CampusModel } from './models/campus.model';

@Injectable()
export class CampusService {
  constructor(private readonly campusRepository: CampusRepository) {}

  async create(createCampusDto: CreateCampusDto, transaction: Transaction) {
    const { campusName } = createCampusDto;

    const campus = await this.campusRepository.findOne({ campusName });

    if (campus) throw new BadRequestException('Campus already exists');

    const payload: ICreateCampus = {
      ...createCampusDto,
      campusCode: this.generateUniqueCodes(),
    };

    const campusData = await this.campusRepository.create(payload, transaction);

    return campusData;
  }

  async findAllCampus() {
    const campus: CampusModel[] = await this.campusRepository.findAll();
    if (!campus || campus.length === 0)
      throw new NotFoundException('No record found!');
    return campus;
  }

  async findCampus(campusCode: string) {
    const campus = await this.campusRepository.findOne({ campusCode });

    if (!campus) throw new NotFoundException('No record found!');
    return campus;
  }

  async update(
    campusCode: string,
    updateCampusDto: UpdateCampusDto,
    transaction: Transaction,
  ) {
    const campus = await this.campusRepository.findOne({ campusCode });

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

  async delete(campusCode: string, transaction: Transaction) {
    const campus = await this.campusRepository.findOne({ campusCode });
    if (!campus) throw new NotFoundException('Campus not found');
    const removeCampus = await this.campusRepository.delete(
      { id: campus.id },
      transaction,
    );
    if (!removeCampus) throw new BadRequestException('Operation failed');
    return;
  }

  private generateUniqueCodes() {
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
