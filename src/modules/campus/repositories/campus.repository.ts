import { ModelRepository } from "src/shared/database/repository/model.repository";
import { Injectable } from "@nestjs/common";
import { CampusModel } from "../models/campus.model";

@Injectable()
export class CampusRepository extends ModelRepository<CampusModel> {
    constructor() {
        super(CampusModel);
    }
}