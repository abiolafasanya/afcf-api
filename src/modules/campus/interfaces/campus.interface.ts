export interface ICreateCampus {
  campusName: string;
  imageUrl?: string;
  state: string;
  town: string;
  branchName: string;
  pastorEmail?: string;
  pastorName?: string;
  pastorPhoneNumber?: string;
  noOfStudent?: number;
  noOfStaff?: number;
  campusCode: string;
}

export interface IUpdateCampus extends Partial<ICreateCampus> {}
