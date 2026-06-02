import { create } from 'zustand';
import type { GoogleMapInfo } from '../models/googleMapApi';
import { initialGoogleMapInfo } from '../models/googleMapApi';
import type { UserLogin } from '../models/user';
import { initialUserLogin } from '../models/user';

interface SettingObject {
  showRegistration: boolean;
  showLogin: boolean;
}

interface PlaceCoord {
  addr: string;
  latitude: number;
  longitude: number;
}

interface AppState {
  // Visitor / user
  visitor: UserLogin;
  visitorPriceEnqCount: number;
  users: UserLogin[];
  login: boolean;
  emailSent: boolean;

  // UI
  showMobileView: boolean;
  showQuoteWindow: boolean;
  disableGlobal: boolean;
  msg: string;
  settingsObj: SettingObject;

  // Booking
  isAirportPickup: boolean;
  pickup: string;
  dest: string;
  airport: string;
  fareInfo: GoogleMapInfo;
  datePickup: string;
  timePickup: string;
  placesArrays: PlaceCoord[];

  // Actions
  setMsg: (msg: string) => void;
  setVisitor: (visitor: UserLogin) => void;
  setVisitorPriceEnqCount: (count: number) => void;
  incrementPriceEnqCount: () => void;
  setUsers: (users: UserLogin[]) => void;
  setLogin: (login: boolean) => void;
  setEmailSent: (sent: boolean) => void;

  setShowMobileView: (show: boolean) => void;
  setShowQuoteWindow: (show: boolean) => void;
  setDisableGlobal: (disable: boolean) => void;
  setSettingsObj: (partial: Partial<SettingObject>) => void;

  setIsAirportPickup: (isAirport: boolean) => void;
  setPickup: (pickup: string) => void;
  setDest: (dest: string) => void;
  setAirport: (airport: string) => void;
  setFareInfo: (fareInfo: GoogleMapInfo) => void;
  setDatePickup: (date: string) => void;
  setTimePickup: (time: string) => void;
  addPlaceCoord: (place: PlaceCoord) => void;
}

export const useAppStore = create<AppState>((set) => ({
  visitor: initialUserLogin,
  visitorPriceEnqCount: 0,
  users: [],
  login: false,
  emailSent: false,

  showMobileView: false,
  showQuoteWindow: false,
  disableGlobal: false,
  msg: '',
  settingsObj: { showRegistration: false, showLogin: false },

  isAirportPickup: false,
  pickup: '',
  dest: '',
  airport: '',
  fareInfo: initialGoogleMapInfo,
  datePickup: '',
  timePickup: '',
  placesArrays: [],

  setMsg: (msg) => set({ msg }),
  setVisitor: (visitor) => set({ visitor }),
  setVisitorPriceEnqCount: (count) => set({ visitorPriceEnqCount: count }),
  incrementPriceEnqCount: () =>
    set((s) => ({ visitorPriceEnqCount: s.visitorPriceEnqCount + 1 })),
  setUsers: (users) => set({ users }),
  setLogin: (login) => set({ login }),
  setEmailSent: (emailSent) => set({ emailSent }),

  setShowMobileView: (showMobileView) => set({ showMobileView }),
  setShowQuoteWindow: (showQuoteWindow) => set({ showQuoteWindow }),
  setDisableGlobal: (disableGlobal) => set({ disableGlobal }),
  setSettingsObj: (partial) =>
    set((s) => ({ settingsObj: { ...s.settingsObj, ...partial } })),

  setIsAirportPickup: (isAirportPickup) => set({ isAirportPickup }),
  setPickup: (pickup) => set({ pickup }),
  setDest: (dest) => set({ dest }),
  setAirport: (airport) => set({ airport }),
  setFareInfo: (fareInfo) => set({ fareInfo }),
  setDatePickup: (datePickup) => set({ datePickup }),
  setTimePickup: (timePickup) => set({ timePickup }),
  addPlaceCoord: (place) =>
    set((s) => {
      const exists = s.placesArrays.some((p) => p.addr === place.addr);
      return {
        placesArrays: exists
          ? s.placesArrays.map((p) => (p.addr === place.addr ? place : p))
          : [...s.placesArrays, place],
      };
    }),
}));
