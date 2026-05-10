export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  encryptedUserId: any;
  encryptedPassword: any;
  position: string;
  updated: Date;
  deletedFlag: boolean;
}
