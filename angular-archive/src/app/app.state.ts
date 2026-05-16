import { GoogleMapInfo } from "./model/google-map-api.model";
import { UserLogin } from "./shared/models/user.model";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AppState{
  msg: any;
  visitor: UserLogin;
  visitorPriceEnqCount: number;
  showMobileView: boolean;
  isAirportPickup: boolean
  pickup: string;
  dest: string;
  airport: string;
  fareInfo: GoogleMapInfo;
  datePickup: string;
  timePickup: string;
  placesArrays: { addr: string, latitude: number; longitude: number; }[]
  settingsObj: SettingObject;
  emailSent: boolean;
  login: boolean;
  users: UserLogin[];
  showQuoteWindow: boolean;
  disableGlobal: boolean;
}

export interface SettingObject {
  showRegistration: boolean;
  showLogin: boolean;
}
