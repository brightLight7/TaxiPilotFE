export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  address: string;
  isActive: boolean;
  deletedFlag: boolean;
  updated: Date;
  updatedBy: string;
}
