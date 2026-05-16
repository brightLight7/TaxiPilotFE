import { SettingObject } from 'src/app/app.state';
import { showMobileView, insertUser } from './app/app.actions';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  airportSelector,
  datePickupSelector,
  destSelector,
  disableGlobalSelector,
  fareSelector,
  getEmailSentSelector,
  getGlobalMsgSelector,
  getUserSelector,
  getVisitorSelector,
  isAirportPickupSelector,
  pickupSelector,
  placesArraysSelector,
  settingsObjSelector,
  showLoginSelector,
  showMobileViewSelector,
  showQuoteWindowSelector,
  timePickupSelector,
  visitorPriceEnqCountSelector,
} from './selectors/app.selectors';
import * as AppActions from './app/app.actions';
import * as AppActions2 from './app/app.actions';
import { RootState } from './root.interface';
import { map, Observable } from 'rxjs';
import { GoogleMapInfo } from '../model/google-map-api.model';
import { UserLogin } from '../shared/models/user.model';

@Injectable()
export class AppFacade {


  showMobileView$ = this.store.pipe(select(showMobileViewSelector));
  visitor$ = this.store.pipe(select(getVisitorSelector));
  pickup$ = this.store.pipe(select(pickupSelector));
  dest$ = this.store.pipe(select(destSelector));
  airport$ = this.store.pipe(select(airportSelector));
  isAirportPickup$ = this.store.pipe(select(isAirportPickupSelector));
  fareInfo$ = this.store.pipe(select(fareSelector));
  datePickup$ = this.store.pipe(select(datePickupSelector));
  timePickup$ = this.store.pipe(select(timePickupSelector));
  placesArrays$ = this.store.pipe(select(placesArraysSelector));
  visitorPriceEnqCount$ = this.store.pipe(select(visitorPriceEnqCountSelector));
  showLogin$ = this.store.pipe(select(showLoginSelector));
  showRegistration$ = this.store.pipe(select(showLoginSelector));
  emailSent$ = this.store.pipe(select(getEmailSentSelector));
  msg$ = this.store.pipe(select(getGlobalMsgSelector));
  showQuoteWindow$ = this.store.pipe(select(showQuoteWindowSelector));
  disableGlobal$ = this.store.pipe(select(disableGlobalSelector));
  //User
  user$ = this.store.pipe(select(getUserSelector));
  //User
  insertUserSuccess(value: UserLogin) {
    //when a user added to db then we will add it to store
    this.store.dispatch(AppActions2.insertUser({ user: value }));
  }

  setPickUp(value: string): void {
    this.store.dispatch(AppActions.savePickupAction({ pickup: value }));
  }

  setDest(value: string): void {
    this.store.dispatch(AppActions.saveDestAction({ dest: value }));
  }

  setAirport(value: string) {
    this.store.dispatch(AppActions.airportAction({ airport: value }));
  }

  setFare(value: GoogleMapInfo) {
    this.store.dispatch(AppActions.fareAction({ fareInfo: value }));
  }

  setDatePickup(value: string) {
    this.store.dispatch(AppActions.datesavePickupAction({ datePickup: value }));
  }

  setTimePickup(value: string) {
    this.store.dispatch(AppActions.timesavePickupAction({ timePickup: value }));
  }

  setGlobalMsg(value: string) {
    this.store.dispatch(AppActions.SetGlobalMsg({ msg: value }));
  }

  saveVisitor(value: UserLogin) {
    this.store.dispatch(AppActions.SaveVisitor({ visitor: value }));
  }

  setIsUserLoggedIn(value: boolean) {
    this.store.dispatch(AppActions.IsUserLogin({ login: value }));
  }

  setEmailSent(value: boolean) {
    this.store.dispatch(AppActions.EmailSent({ emailSent: value }));
  }

  setShowRegisterLogin(value: boolean) {
    this.store.dispatch(
      AppActions.UpdateSettingsObj({ settingObj: { showRegistration: value } })
    );
  }

  setVisitorClickedGetPrice_Counter() {
    this.store.dispatch(AppActions.SaveVisitorPriceEnqCount());
  }

  setPlacesArray(placesArrays: {
    addr: string;
    latitude: number;
    longitude: number;
  }) {
    this.store.dispatch(
      AppActions.SavePlacesArray({ placesArrays: placesArrays })
    );
  }

  setPickupToggle(isAirportPickup: boolean) {
    this.store.dispatch(
      AppActions.pickupDestToggle({ isAirportPickup: !isAirportPickup })
    );
  }

  setShowMobileView(value: boolean) {
    this.store.dispatch(AppActions.showMobileView({ showMobileView: value }));
  }

  setShowQuoteWindow(value: boolean) {
    this.store.dispatch(AppActions.showQuoteWindow({ showQuoteWindow: value }));
  }

  setDisableGlobal(value: boolean) {
    this.store.dispatch(AppActions.setDisableGlobal({ disableGlobal: value }));
  }
  // async getPickupDest() {
  //   return await this.store.select(airportSelector).pipe(map((address) => address));
  // }

  // setAirport(selectedAirport: string): void {
  //   this.store.dispatch(AppActions.airportAction({ airport: selectedAirport }));
  // }

  // async getAirport() {
  //   return await this.store.select(airportSelector).pipe(map((x) => x));
  // }

  constructor(private store: Store<RootState>) {}
}
