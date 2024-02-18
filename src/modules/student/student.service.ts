import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { CacheStoreService } from 'src/shared/cache-store/cache-store.service';
import { StudentRepository } from './repositories/student.repository';
import { Transaction } from 'sequelize';
import { ICreateStudent } from './interfaces/student.interface';
import { CampusService } from '../campus/campus.service';
import { StudentModel } from './models/student.model';

@Injectable()
export class StudentService {
  constructor(
    private readonly studentRepository: StudentRepository,
    private readonly campusService: CampusService,
    // private readonly cacheStoreService: CacheStoreService,
  ) {}

  async create(
    campusCode: string,
    createStudentDto: CreateStudentDto,
    transaction: Transaction,
  ) {
    const campus = await this.campusService.findCampus(campusCode);
    if (!campus)
      throw new BadRequestException(
        'CampusId is not valid, use a valid campusId',
      );

    const user = await this.studentRepository.findOne({
      email: createStudentDto.email,
    });
    if (user) throw new ConflictException('Duplicate record, email taken');
    const payload: ICreateStudent = {
      ...createStudentDto,
      campusCode,
    };

    const createStudent = await this.studentRepository.create(
      payload,
      transaction,
    );

    return createStudent;
  }

  async findAll() {
    const students = await this.studentRepository.findAll();

    if (!students || students.length === 0)
      throw new NotFoundException('No record found!');
    return students;
  }

  async findstudent(studentId: string) {
    const student = await this.studentRepository.findOne({
      id: studentId,
    });

    if (!student) throw new NotFoundException('No record found!');
    return student;
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
