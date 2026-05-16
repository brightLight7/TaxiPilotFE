export interface CustomerNote {
  id: number;
  rideId: number;
  customerId: number;
  note: any;
  createdDate: Date;
  updatedDate: Date;
  createdBy: string;
  updatedBy: string;
  deletedFlag: boolean;
  Customers?: Customer[];
  Rides?: Ride[];
}
