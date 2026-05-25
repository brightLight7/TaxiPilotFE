import { disableGlobalSelector } from './../selectors/app.selectors';
import * as AppAction from './app.actions';
import { createReducer, on } from '@ngrx/store';
import { SettingObject } from 'src/app/app.state';
import {
  GoogleMapInfo,
  initialGoogleMapInfo,
} from 'src/app/model/google-map-api.model';
import { initialUserLogin, UserLogin } from 'src/app/shared/models/user.model';

export interface AppState {
  visitor: UserLogin,
  visitorPriceEnqCount: number;
  showMobileView: boolean;
  isAirportPickup: boolean;
  pickup: string;
  dest: string;
  airport: string;
  fareInfo: GoogleMapInfo;
  datePickup: string;
  timePickup: string;
  placesArrays: { addr: string, latitude: number; longitude: number }[];
  settingsObj: SettingObject;
  emailSent: boolean;
  login: boolean;
  msg: string;
  users: UserLogin[];
  showQuoteWindow: boolean;
  disableGlobal: boolean;
}


export const initialState: AppState = {
  visitor: initialUserLogin,
  visitorPriceEnqCount: 0,
  showMobileView: false,
  isAirportPickup: false,
  pickup: '',
  dest: '',
  airport: '',
  fareInfo: initialGoogleMapInfo,
  datePickup: '',
  timePickup: '',
  placesArrays: [],
  settingsObj: {
    showRegistration: false,
    showLogin: false,
  },
  emailSent: false,
  login: false,
  msg: '',
  users: [],
  showQuoteWindow: false,
  disableGlobal: false
}

export const appReducer = createReducer<AppState>(
  initialState,
  on(AppAction.setGlobalMsg, (state, action): AppState => {
    return {
      ...state,
      msg: action.msg,
    };
  }),
  on(AppAction.saveVisitor, (state, action): AppState => {
    return {
      ...state,
      visitor: action.visitor,
    };
  }),
  on(AppAction.fetchVisitor, (state): AppState => {
    return {
      ...state
    };
  }),
  on(AppAction.showMobileView, (state, action): AppState => {
    return {
      ...state,
      showMobileView: action.showMobileView,
    };
  }),
  on(AppAction.pickupDestToggle, (state, action): AppState => {
    return {
      ...state,
      isAirportPickup: action.isAirportPickup,
    };
  }),
  on(AppAction.savePickupAction, (state, action): AppState => {
    return {
      ...state,
      pickup: action.pickup,
    };
  }),
  on(AppAction.saveDestAction, (state, action): AppState => {
    return {
      ...state,
      dest: action.dest,
    };
  }),
  on(AppAction.airportAction, (state, action): AppState => {
    return {
      ...state,
      airport: action.airport,
    };
  }),
  on(AppAction.fareAction, (state, action): AppState => {
    return {
      ...state,
      fareInfo: action.fareInfo,
    };
  }),
  on(AppAction.datesavePickupAction, (state, action): AppState => {
    return {
      ...state,
      datePickup: action.datePickup,
    };
  }),
  on(AppAction.timesavePickupAction, (state, action): AppState => {
    return {
      ...state,
      timePickup: action.timePickup,
    };
  }),
  on(AppAction.SavePlacesArray, (state, action): AppState => {
    const newPlace = action.placesArrays;
    const existingPlaces = state.placesArrays;

    // Check if a place with the same address exists
    const updatedPlacesArrays = existingPlaces.some(place => place.addr === newPlace.addr)
      ? existingPlaces.map(place =>
          place.addr === newPlace.addr ? newPlace : place // Replace if the address matches
        )
      : [...existingPlaces, newPlace]; // Add the new place if no match

    return {
      ...state,
      placesArrays: updatedPlacesArrays
    };
  }),
  on(AppAction.saveVisitorPriceEnqCount, (state): AppState => {

    // Check for uniqueness to avoid duplicate places
    return {
      ...state,
      visitorPriceEnqCount: state.visitorPriceEnqCount + 1
    };
  }),
  on(AppAction.updateSettingsObj, (state, { settingObj }): AppState => {

    // Check for uniqueness to avoid duplicate places
    return {
      ...state,
      settingsObj: {
      ...state.settingsObj,
      ...settingObj
      },
    };
  }),
  on(AppAction.showQuoteWindow, (state, action): AppState => {
    return {
      ...state,
      showQuoteWindow: action.showQuoteWindow,
    };
  }),
  on(AppAction.setDisableGlobal, (state, action): AppState => {
    return {
      ...state,
      disableGlobal: action.disableGlobal,
    };
  }),
);

// import * as AppAction from '../actions/app.actions';
// import { createReducer, on } from '@ngrx/store';

// export interface AppState {
//   pickupDest: string;
//   airport: string
// }

// const initialState: AppState = {
//   pickupDest: '',
//   airport: ''
// };

// export const appReducer = createReducer(
//   initialState,
//   on(
//     AppAction.streetAction, (state, action): AppState => {
//       console.log('Reducer called with pickupDest:', action.pickupDest); // Debug log
//       return {
//         ...state,
//         pickupDest: action.pickupDest?? ''
//       };
//     }
//   ),
//   on(AppAction.airportAction, (state, action): AppState =>{
//     return{
//       ...state,
//       airport: action.airport
//     }
//   }
// ));
