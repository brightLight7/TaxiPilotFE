export interface Driver {
  id: number;
  firstName: string;
  lastName: string;
  licenseNumber: string;
  phoneNumber: string;
  email: string;
  address: string;
  isActive: boolean;
  deletedFlag: boolean;
  updated: Date;
  updatedBy: string;
}
