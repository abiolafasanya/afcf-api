import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { CampusRepository } from '../campus/repositories/campus.repository';
import { CacheStoreService } from 'src/shared/cache-store/cache-store.service';
import { StudentRepository } from './repositories/student.repository';
import { Op, Transaction } from 'sequelize';
import { ICreateStudent } from './interfaces/student.interface';
import { CampusService } from '../campus/campus.service';
import { StudentModel } from './models/student.model';

@Injectable()
export class StudentService {
  constructor(
    private readonly studentRepository: StudentRepository,
    private readonly campusService: CampusService,
    private readonly cacheStoreService: CacheStoreService,
  ) {}

  async create(
    campusId: string,
    createStudentDto: CreateStudentDto,
    transaction: Transaction,
  ) {
    console.log(campusId);
    const campus = await this.campusService.findCampus(campusId);
    console.log(campus);
    if (!campus)
      throw new BadRequestException(
        'CampusId is not valid, use a valid campusId',
      );
    console.log(createStudentDto);

    const user = await this.studentRepository.findOne({
      email: createStudentDto.email,
    });
    if (user) throw new ConflictException('Duplicate record, email taken');
    const payload: ICreateStudent = {
      ...createStudentDto,
      email: createStudentDto.email?.toLowerCase(),
      campusId,
    };

    const studentData = await this.studentRepository.create(
      payload,
      transaction,
    );

    const { ...data } = studentData.toJSON();

    return data;
  }

  async findAll(campusId: string) {
    let students: StudentModel[]
    if(campusId) {
      students = await this.studentRepository.findAll({
        [Op.or]: [{ campusId }],
      });

    } else {
       students = await this.studentRepository.findAll();

    }

    if (!students || students.length === 0)
      throw new NotFoundException('No record found!');
    return students.map((student) => student.toJSON());
  }

  async findstudent(studentId: string) {
    const student = await this.studentRepository.findOne({
      id: studentId,
    });

    if (!student) throw new NotFoundException('No record found!');
    const { ...data } = student.toJSON();
    return data;
  }

  async update(
    studentId: string,
    updateStudentDto: UpdateStudentDto,
    transaction: Transaction,
  ) {
    const student = await this.studentRepository.findById(studentId);
    if (!student) throw new NotFoundException('Student record not found');
    const updateStudent = await this.studentRepository.update(
      { id: studentId },
      updateStudentDto,
      transaction,
    );
    if (!updateStudent)
      throw new BadRequestException(
        'Operation failed, please check your inputs and try again',
      );
    return;
  }

  async remove(studentId: string, transaction: Transaction) {
    const student = await this.studentRepository.findById(studentId);
    if (!student) throw new NotFoundException('Student record not found');
    const deleteStudent = await this.studentRepository.delete(
      { id: studentId },
      transaction,
    );
    if (!deleteStudent)
      throw new BadRequestException('Operation failed, student not deleted');
    return;
  }
}
