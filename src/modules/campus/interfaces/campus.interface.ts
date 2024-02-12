export interface ICreateCampus {
  campusName: string;
  campusPicture?: string;
  state: string;
  town: string;
  pastorName: string;
  branchName: string;
  pastorEmail?: string;
  pastorNumber: string;
  noOfStudent: number;
  noOfStaff: number;
  campusId?: string;
}

export interface IUpdateCampus extends Partial<ICreateCampus> {}
