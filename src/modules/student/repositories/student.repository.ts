import { ModelRepository } from "src/shared/database/repository/model.repository";
import { Injectable } from "@nestjs/common";
import { StudentModel } from "../models/student.model";

@Injectable()
export class StudentRepository extends ModelRepository<StudentModel> {
  constructor() {
    super(StudentModel);
  }
}