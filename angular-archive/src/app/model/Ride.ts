export interface Ride {
  id: number;
  driverId: number;
  vehicleId: number;
  customerId: number;
  pickupLocation: string;
  dropoffLocation: string;
  rideDate: Date;
  fareAmount: number;
  distance: number;
  status: string;
  deletedFlag: boolean;
  updated: Date;
  updatedBy: string;
  Drivers?: Driver[];
  VehicleLKs?: VehicleLK[];
  Customers?: Customer[];
}
