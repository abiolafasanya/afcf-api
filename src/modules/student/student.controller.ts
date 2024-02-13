import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { TransactionParam } from 'src/common/decorators/transaction-param.decorator';
import { Transaction } from 'sequelize';
import { Public } from 'src/common/decorators/public.decorator';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Public()
  @Post('')
  @ResponseMessage('Student record created')
  create(
    @Body() createStudentDto: CreateStudentDto,
    @TransactionParam() transaction: Transaction,
    @Query('campusId') campusId,
  ) {
    return this.studentService.create(campusId, createStudentDto, transaction);
  }

  @Public()
  @ResponseMessage('All students record')
  @Get()
  findAll(@Query('campusId') campusId: string) {
    return this.studentService.findAll(campusId);
  }

  @Public()
  @Get(':studentId')
  @ResponseMessage('Student record found')
  findOne(@Param('studentId') studentId: string) {
    return this.studentService.findstudent(studentId);
  }

  @Public()
  @Patch(':studentId')
  @ResponseMessage('Student record updated')
  update(
    @Param('studentId') studentId: string,
    @Body() updateStudentDto: UpdateStudentDto,
    @TransactionParam() transaction: Transaction,
  ) {
    return this.studentService.update(studentId, updateStudentDto, transaction);
  }

  @Public()
  @Delete(':studentId')
  @ResponseMessage('Student record deleted')
  remove(
    @Param('studentId') studentId: string,
    @TransactionParam() transaction: Transaction,
  ) {
    return this.studentService.remove(studentId, transaction);
  }
}
