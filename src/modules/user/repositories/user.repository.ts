import { ModelRepository } from "src/shared/database/repository/model.repository";
import { UserModel } from "../models/user.model";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRepository extends ModelRepository<UserModel> {
    constructor() {
        super(UserModel);
    }
}