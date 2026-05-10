import { UserLogin } from "../models/user.model";

export interface IAddress {
    adress: string;
    icon: string | number;
    latitude: number;
    longitude: number;
  }

export interface ApiResponse {
  message: string;
  user: UserLogin;
}
