export interface GoogleMapInfo {
  pickup: string;
  dest: string;
  driverBase: string;
  fare: string;
  distance: string;
  duration: string;
  arrivalTime: string;
  pickupDateTime: string;
}

export const initialGoogleMapInfo: GoogleMapInfo = {
  pickup: '',
  dest: '',
  driverBase: '',
  fare: '',
  distance: '',
  duration: '',
  arrivalTime: '',
  pickupDateTime: '',
};
