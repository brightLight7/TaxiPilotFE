import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { delay, isEmpty, map, takeUntil, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';

import { COOKIE_VISITOR_EMAIL_ADDRESS_KEY } from 'src/app.constants';
import { Employee } from 'src/app/model/Employee';
import { GoogleMapInfo } from 'src/app/model/google-map-api.model';
import { SettingLk } from 'src/app/model/SettingLk';
import { AppState } from 'src/app/app.state';
import { AppFacade } from 'src/app/store/app.facade';
import CookieServices from 'src/app/shared/utlities/cookies';
import { Router } from '@angular/router';
import { createLocalStorageItem, getLocalStorageItem } from 'src/app/shared/global-functions/global-functions';
import { GoogleMapService } from 'src/app/shared/services/googlemap.service';
import { CONSTANTS } from 'src/app/shared/constants/constants';
import { RegisterLogin2Component } from '../register-login-2/register-login-2.component';

@Component({
  selector: 'app-quote-airport',
  providers: [RegisterLogin2Component],
  templateUrl: './quote-airport.component.html',
  styleUrls: ['./quote-airport.component.scss'],
})
export class QuoteAirportComponent implements OnInit, OnDestroy {
  showLogin$: Observable<boolean> | undefined;
  showGetQuoteButton = false;

  timeSelectedParent($event: string) {
    this.appFacade.setTimePickup($event);
  }

  airportSelectedParent(airport: string) {
    this.selPickup = airport;
  }


  // #region declarations
  @ViewChild('dateInput', { static: false }) dateInput!: ElementRef;
  @ViewChild('timeInput', { static: false }) timeInput!: ElementRef;

  @Input() mobile_postcode = '';
  @Input() mobile_location = '';

  latitude = 0;
  longitude = 0;

// In QuoteAirportComponent
  distanceKM = 0;
  arrivalTime = '';
  distanceMiles = 0;
  showGateFareBtn = false;
  duration: string | undefined;
  visitorPriceEnqCount = 0;

  placesArray = [];
  inputPickup = '';
  inputDest = '';
  selPickup = '';
  selDest = '';
  fCtrlDate = 'dd/mm/yyyy';
  fCtrlTime = '00:00';

  iconColor = '#ffc107';

  address: any;
  driverLocation = 'Crawley';
  addressPickup: string | undefined;
  addressDest!: string;
  fare!: number;

  isLoading = true;
  isLoadingDiv = true;
  showPricePanel = true;
  fareInfoReceived = false;

  form!: FormGroup;
  minDate!: string;
  maxDate!: string;
  timeStep = 300;

  private destroy$ = new Subject<void>();
  showLoading: boolean | undefined;
  pickupDateTime = '';

  fareInfo$!: Observable<GoogleMapInfo>;
  fareInfo2!: GoogleMapInfo;
  employees$!: Observable<Employee[]>;
  settinglks$!: Observable<SettingLk[]>;
  selPickup2$!: Observable<string>;

  driverBase: string | undefined;

  pickupDestEntered = 'Crawley, West Sussex';
  pickupPrice: string | undefined;
  destPrice: string | undefined;
  fadeInContainer = false;
  isAirportPickup = true;
  places$: Observable<{ latitude: number; longitude: number }[]> | undefined;
  placesLat$: Observable<{ latitude: number; longitude: number }[]> | undefined;
  showMap = false;
  showRegistration = false;

  // #endregion

  // #region Lifecycle Hooks
  ngOnInit(): void {
    this.appFacade.setShowRegisterLogin(false);
    // Initialize the form with validators
    this.form = this.fb.group({
      airport: ['', Validators.required], // Airport dropdown
      //inputPickup: ['', Validators.required], // Autocomplete input
      //inputDest: ['', Validators.required], // Autocomplete input
      selPickup: ['', Validators.required], // Select pickup input
      selDest: ['', Validators.required], // Destination input
      address: ['', Validators.required], // Destination input
      date: ['', Validators.required], // Destination input
      // fCtrlTime: ['', Validators.required], // Destination input
    });

    this.latitude = 51.150182;
    this.longitude = -0.176674;
    const placesArray = { latitude: this.latitude, longitude: this.longitude };
    // this.appFacade.setPlacesArray(placesArray);

    const today = new Date();
    const futureDate = this.addMonths(today, 4);
    this.minDate = this.formatDate(this.addDays(today, 2));
    this.maxDate = this.formatDate(futureDate);

    this.form.controls['inputPickup']?.setValue(this.mobile_location);

    // #region App Facade Subscribe
    this.fetchValuesFromStore();

    // this.appFacade.airport$.subscribe((x) => {
    //   this.showMap = x !== '' && this.showMap == true ? true : false;
    //   this.inputDest = x;
    //   this.showGateFareBtn =
    //     this.showGateFareBtn === true && this.inputDest !== '' ? true : false;
    // });





    this.appFacade.showLogin$.subscribe((data) => {
      this.showRegistration = data;
      // this.showRegistration will true if user hit Get fare 5th time. this.showRegistration can be false if user restart app on same day.
      if(this.showRegistration == false) {
        const getFareClickedCounter = getLocalStorageItem('get-fare-clicked-counter');
        if(getFareClickedCounter && parseInt(getFareClickedCounter.counter) > 10){
          this.showRegistration = true;
          this.appFacade.setShowRegisterLogin(true);
        }
      } else {
        this.showRegistration = true;
      }
    });
    // #endregion

    // #region Gatwick Postcode
    this.gatwickTerminalSelectedByPostCode();
    // #endregion

    // #region Airport Toggle button
    // Listen for changes to toggle between airport dropdown and address autocomplete
    this.form.get('isAirportPickup')?.valueChanges.subscribe((checked: any) => {
      this.onTogglePickupType(checked);
    });
    // #endregion

    setInterval(() => {
      this.fadeInContainer = true;
    }, 500); // 1/2 seconds delay
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  // #endregion

  // #region HTML events
  openDatePicker() {
    this.dateInput.nativeElement.showPicker(); // Open the date picker
  }

  openTimePicker() {
    this.timeInput.nativeElement.showPicker(); // Open the time picker
  }

  handleKeydown(event: KeyboardEvent, type: string) {
    if (event.key === 'Enter' || event.key === ' ') {
      // Space or Enter key
      event.preventDefault(); // Prevent default spacebar scrolling
      if (type === 'date') {
        this.openDatePicker();
      } else if (type === 'time') {
        this.openTimePicker();
      }
    }
  }

  onTogglePickupType(isChecked: boolean): void {
    this.isAirportPickup = !this.isAirportPickup;
    this.appFacade.setPickupToggle(isChecked);
    if (isChecked) {
      // Disable pickup autocomplete if airport pickup is selected
      this.form.get('pickup')?.clearValidators();
      //this.form.get('airport')?.setValidators(Validators.required);
    } else {
      // Disable airport dropdown if regular pickup is selected
      this.form.get('airport')?.clearValidators();
      //this.form.get('pickup')?.setValidators(Validators.required);
    }
    this.form.get('pickup')?.updateValueAndValidity();
    this.form.get('airport')?.updateValueAndValidity();
  }

  addressSelectedParent($event: any, pickup_dest: string) {
    if(pickup_dest == 'pickup')  {
    this.appFacade.setPickUp($event);
    this.inputPickup = $event;
    }
    if(pickup_dest == 'dest')  {
      this.appFacade.setDest($event);
      this.inputDest = $event;
    }

    this.showGetQuote();
  }

  addressSelectedParent2($event: any, pickup_dest: string) {
  }

  addressLatLongSelectedParent($event: string, addr: string) {
    console.log('Lat--->', $event);
    this.latitude = parseFloat($event.split('|')[0]);
    this.longitude = parseFloat($event.split('|')[1]);
    const placesArray = { addr, latitude: this.latitude, longitude: this.longitude };
    this.appFacade.setPlacesArray(placesArray);
  }

  private gatwickTerminalSelectedByPostCode() {
    if (this.mobile_postcode === 'RH6 0NN') {
      this.form.patchValue({ selPickup: 'Gatwick Airport - South Terminal' });
    }
    if (this.mobile_postcode === 'RH6 0PH') {
      this.form.patchValue({ selPickup: 'Gatwick Airport - North Terminal' });
    }
  }

  private fetchValuesFromStore() {
    this.appFacade.pickup$.subscribe((x) => {
      this.showMap = x === '' ? false : true;
      this.inputPickup = x;
      this.showGateFareBtn = this.inputPickup !== '' ? true : false;
    });

    this.appFacade.dest$.subscribe((x) => {
      this.showMap = x === '' ? false : true;
      this.inputDest = x;
      this.showGateFareBtn = this.inputDest !== '' ? true : false;
    });

    this.appFacade.datePickup$.subscribe((x) => {
      if (x != '') {
        this.fCtrlDate = x;
      } else {
        this.fCtrlDate = this.minDate;
        this.appFacade.setDatePickup(this.fCtrlDate);
      }
    });

    this.appFacade.timePickup$.subscribe((x) => {
      if (x != '') {
        this.fCtrlTime = x;
      } else {
        this.fCtrlTime = '00:00 AM';
        this.appFacade.setTimePickup(this.fCtrlTime);
      }
    });

    this.appFacade.isAirportPickup$.subscribe(
      (x) => (this.isAirportPickup = !x)
    );

    this.appFacade.fareInfo$.subscribe((data) => {
      if (data.fare != '') {
        this.fareInfo$ = this.appFacade.fareInfo$;
        this.pickupDateTime = `${this.fCtrlDate} ${this.fCtrlTime}`;
        this.fareInfo$.subscribe((fareInfo) => {

          this.addressPickup = fareInfo.pickup;
          this.distanceMiles = this.roundToNearestWhole(
            parseFloat(fareInfo.distance == undefined ? '0' : fareInfo.distance)
          );
          this.distanceKM = this.roundToNearestWhole(
            parseFloat(fareInfo.distance == undefined ? '0' : fareInfo.distance) * 1.60934
          );

          this.duration = fareInfo.duration;
          this.arrivalTime = this.getArrivalTime(
            this.pickupDateTime,
            fareInfo.duration == undefined ? '0' : fareInfo.duration
          );

        });

      }
    });

    this.showGetQuote();
  }
  showGetQuote() {
    if (this.inputPickup != "" && this.inputPickup != "undefined" && this.inputDest != ""  && this.inputDest != "undefined"  ){
      this.showGetQuoteButton = true;
    }
  }

  closeQuoteWindow() {
    this.appFacade.setShowQuoteWindow(false);
    this.appFacade.setDisableGlobal(false);
    }
  // #endregion

  // #region Submit
  onSubmit() {
    // #region No of Get Fare
    // TODO Prevent user to get more than 1 quotes.. must register..
    // TODO registered user can only get 5 quotes a day - email to company

    const getFareClickedCounter = getLocalStorageItem('get-fare-clicked-counter');
    if (getFareClickedCounter) {
      //console.log('getFareClickedCounter.counter ->', getFareClickedCounter.counter);
      // TODO We must save price enquiry count by saving to local storage... we allow visitor to enquire the price 4 times
      if(parseInt(getFareClickedCounter.counter) > 10){
        this.appFacade.setShowRegisterLogin(true);
        this.showRegistration = true;
        return;
      }
      // TODO following codes may not be needed... we must save price enquire count by saving to local storage...
      // this.appFacade.visitorPriceEnqCount$.subscribe((count) => {
      //   this.visitorPriceEnqCount = count;
      //   if (count == 2) {
      //     this.router.navigateByUrl('/registration-login');
      //   }
      // });
    }
    // #endregion

    if (!this.inputPickup || !this.inputDest) {
      return;
    }

    this.showPricePanel = true;
    this.isLoading = true;
    this.showLoading = true;

    const _driverBase = this.driverLocation;

    this.pickupPrice = this.inputPickup;
    this.destPrice = this.inputDest;

    this.pickupDateTime = `${this.fCtrlDate} ${this.fCtrlTime}`;

    const _apCharges = '6';
    const _radiusDist = '6';
    // this.appFacade.setPickUp(this.pickupPrice);
    // this.appFacade.setDest(this.destPrice);
    this.fetchValuesFromStore();
    this.fareInfo$ = this.service
      .getGoogleMapInfo(
        `${_apCharges}`,
        `${_radiusDist}`,
        this.pickupDateTime,
        _driverBase,
        this.pickupPrice,
        this.destPrice
      )
      .pipe(
        delay(2000),
        tap(() => {
          // #region cookie visitor email
          //check if user email cookie exists
          if (
            this.cookieServices.getCookie(COOKIE_VISITOR_EMAIL_ADDRESS_KEY) ===
            undefined
          ) {
            this.showRegistration = false; //TODO
            // present a dialog box to ask user to enter his/her email - user might have set to to accept cookie message
            // then you can ask again
            this.showLoading = false;
            this.isLoading = false;
            return;
          } else {
            this.showLoading = false;
            this.isLoading = false;
          }
          // #endregion
        }),
        map((fareInfo) => {

          this.addressPickup = fareInfo.pickup;
          this.distanceMiles = this.roundToNearestWhole(
            parseFloat(fareInfo.distance == undefined ? '0' : fareInfo.distance)
          );
          this.distanceKM = this.roundToNearestWhole(
            parseFloat(fareInfo.distance == undefined ? '0' : fareInfo.distance) * 1.60934
          );
          this.duration = fareInfo.duration;
          this.arrivalTime = this.getArrivalTime(
            this.pickupDateTime,
            fareInfo.distance == undefined ? '0' : fareInfo.distance
          );

          this.appFacade.visitorPriceEnqCount$.subscribe(
            (x) => {
              x++;
              this.visitorPriceEnqCount = x;
              createLocalStorageItem('get-fare-clicked-counter', {counter:x}, undefined, '00:00' );

            }
          );
          this.appFacade.setVisitorClickedGetPrice_Counter();



          return fareInfo;
        })
      );

    this.fareInfo$
      .pipe(
        tap((p) => {
          this.fareInfoReceived = true;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (info) => {
          this.appFacade.setFare(info);
        },
        (error) => {
          this.isLoading = false;
        }
      );
    //disable Get Fare button
    // this.inputPickup = '';
    // this.selPickup = '';
    // this.showGateFareBtn = false;
    //----------------------------

    // this.service.getSettings().subscribe({
    //   next: (data) => {
    //     this.driverBase = data.filter(
    //       (x) => x.settingKey == 'Base'
    //     )[0].settingValue;
    //     console.log(
    //       'Base:',
    //       data.filter((x) => x.settingKey == 'Base')[0].settingValue
    //     );
    //     console.log('Fetched settings:', data);
    //     return data;
    //   },
    //   error: (error) => {
    //     // eslint-disable-next-line no-debugger
    //     debugger; // Inspect error details
    //     console.error('Error fetching settings:', error);
    //   },
    // });
  }

  registerPlease() {
    this.appFacade.setShowRegisterLogin(false);
    this.showRegistration = false;
  }

  roundToNearestWhole(value: number): number {
    return Math.round(value * 100) / 100;
  }
  getArrivalTime(dateStr: string, durationStr: string): string {
    const [year, month, dayTime] = dateStr.split('-');
    const [day, time] = dayTime.split(' ');
    const [hour, minute] = time.split(':');

    //const date = new Date(dateStr.replace(" ", "T")); // Convert to ISO format
    let dateArrive = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
      0,
      0
    );

    dateArrive = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
      parseInt(hour),
      parseInt(minute)
    );

    // Parse duration string
    const hourMatch = durationStr.match(/(\d+)\s*hr/);
    const minuteMatch = durationStr.match(/(\d+)\s*min/);

    const hoursToAdd = hourMatch ? parseInt(hourMatch[1]) : 0;
    const minutesToAdd = minuteMatch ? parseInt(minuteMatch[1]) : 0;

    // Add parsed hours and minutes to the date
    dateArrive.setHours(dateArrive.getHours() + hoursToAdd);
    dateArrive.setMinutes(dateArrive.getMinutes() + minutesToAdd);
    const [day1, month1, year1] = dateArrive
      .toLocaleDateString('en-GB')
      .split('/')
      .map(Number);
    const dateArrival = new Date(year1, month1 - 1, day1);

    const datePickup = new Date(`${dateStr.split(' ')[0]} 00:00`); // Example date 1
    const datePlus = dateArrival > datePickup ? ' (+1)' : '';
    //const dateArrival = new Date(`${dateArrive.split(' ')[0]} 00:00` ); // Example date 1

    //const formattedDate = `${dateArrive.getFullYear()}-${String(dateArrive.getMonth() + 1).padStart(2, '0')}-${String(dateArrive.getDate()).padStart(2, '0')} ${String(dateArrive.getHours()).padStart(2, '0')}:${String(dateArrive.getMinutes()).padStart(2, '0')}`;
    const formattedArrivalTime = `${String(dateArrive.getHours()).padStart(
      2,
      '0'
    )}:${String(dateArrive.getMinutes()).padStart(2, '0')} ${datePlus}`;

    return formattedArrivalTime;
  }
  // #endregion

  // #region Custom Events
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  addMonths(date: Date, months: number): Date {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
  }

  addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  onTimeSelected(event: any): void {
    const input = event.target as HTMLInputElement;
    const currentValue = input.value;

    if (currentValue) {
      let [hours, minutes] = currentValue.split(':').map(Number);

      hours++;
      hours--;

      minutes = Math.round(minutes / 5) * 5;
      const newTime = `${hours < 10 ? '0' + hours : hours}:${
        minutes < 10 ? '0' + minutes : minutes
      }`;
      input.value = newTime;
      //this.form.get('time')!.setValue(newTime, { emitEvent: false });
      this.appFacade.setTimePickup(newTime);
      event.preventDefault();
    }
  }

  blurDateTime($event: any) {
    console.log($event);
    this.appFacade.setDatePickup($event.target.value);
  }
  // #endregion

  // getEmployee(){
  //   this.employees$ = this.service.getEmployee().pipe(
  //     tap(x => console.log('Employee fetched:', x)),
  //     map(emp => {
  //       console.log('Mapped employee:', emp);
  //       return emp; // Return the value to ensure the observable type remains Employee[]
  //     })
  //   );
  // }

  // #region Constructor
  constructor(
    private store: Store<AppState>,
    private service: GoogleMapService,
    private fb: FormBuilder,
    private cookieServices: CookieServices,
    private appFacade: AppFacade,
    private router: Router,
  ) {}
  // #endregion
}
