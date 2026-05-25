// app.selectors.ts
import { createSelector } from '@ngrx/store';
import { RootState } from '../root.interface';
import { AppState } from 'src/app/app.state';

// Selector to access `app` slice
export const selectAppState = (state: RootState) => state.app;

export const showMobileViewSelector = createSelector(selectAppState, state => state.showMobileView);
export const isAirportPickupSelector = createSelector(selectAppState, (state: AppState) => state.isAirportPickup);
export const pickupSelector = createSelector(selectAppState, (state: AppState) => state.pickup);
export const destSelector = createSelector(selectAppState, (state: AppState) => state.dest);
export const airportSelector = createSelector(selectAppState, (state: AppState) => state.airport);
export const fareSelector = createSelector(selectAppState, (state: AppState) => state.fareInfo);
export const datePickupSelector = createSelector(selectAppState, (state: AppState) => state.datePickup);
export const timePickupSelector = createSelector(selectAppState, (state: AppState) => state.timePickup);
export const placesArraysSelector = createSelector(selectAppState, (state: AppState) => state.placesArrays);
export const visitorPriceEnqCountSelector = createSelector(selectAppState, (state: AppState) => state.visitorPriceEnqCount);
export const settingsObjSelector = createSelector(selectAppState, (state: AppState) => state.settingsObj);
export const showLoginSelector = createSelector(selectAppState, (state: AppState) => state.settingsObj.showRegistration);
export const showRegistrationSelector = createSelector(selectAppState, (state: AppState) => state.settingsObj.showRegistration);
export const getEmailSentSelector = createSelector(selectAppState, (state: AppState) => state.emailSent);
export const getVisitorSelector = createSelector(selectAppState, (state: AppState) => state.visitor);
export const getGlobalMsgSelector = createSelector(selectAppState, (state: AppState) => state.msg);
export const showQuoteWindowSelector = createSelector(selectAppState, (state: AppState) => state.showQuoteWindow);
export const disableGlobalSelector = createSelector(selectAppState, (state: AppState) => state.disableGlobal);

export const getUserSelector = createSelector(selectAppState, (state: AppState) => state.users);



