export interface DriverVehicle {
  id: number;
  driverId: number;
  vehicleId: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  deletedFlag: boolean;
  updated: Date;
  updatedBy: string;
  Drivers?: Driver[];
  VehicleLKs?: VehicleLK[];
}
