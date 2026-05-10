import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { delay, map, takeUntil, tap } from 'rxjs/operators';
import { COOKIE_VISITOR_EMAIL_ADDRESS_KEY } from 'src/app.constants';
import { Employee } from 'src/app/model/Employee';
import { GoogleMapInfo } from 'src/app/model/google-map-api.model';
import { SettingLk } from 'src/app/model/SettingLk';
import { TaxipilotService } from 'src/app/shared/services/taxipilot.service';
import CookieServices from 'src/app/shared/utlities/cookies';
import { RegisterLogin2Component } from '../../register-login-2/register-login-2.component';

@Component({
  selector: 'app-mobile-quote-airport',
  providers: [RegisterLogin2Component],
  templateUrl: './mobile-quote-airport.component.html',
  styleUrls: ['./mobile-quote-airport.component.scss'],
})

export class MobileQuoteAirportComponent implements OnInit, AfterViewInit, OnDestroy {
blurDateTime($event: FocusEvent) {
console.log($event);
}

  @ViewChild('dateInput', { static: false }) dateInput!: ElementRef;
  @ViewChild('timeInput', { static: false }) timeInput!: ElementRef;

  @Input() mobile_postcode = '';
  @Input() mobile_location = '';

  inputPickup = '';
  inputDest = '';
  selPickup = '';
  selDest = '';
  fCtrlDate = '';
  fCtrlTime = '00:00';


  showRegistration = false;

  address: any;
  driverLocation = 'crawley';
  addressPickup!: string;
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

  isAirportPickup = true; // Controls whether airport dropdown or autocomplete is shown

  private destroy$ = new Subject<void>();
  showLoading: boolean | undefined;
  pickupDateTime: number | undefined;

  fareInfo$!: Observable<GoogleMapInfo>;
  employees$!: Observable<Employee[]>;
  settinglks$!: Observable<SettingLk[]>;
  driverBase: string | undefined;

  airportSelected = 'Select pickup airport';
  pickupDestEntered = 'Crawley, West Sussex';
  pickupPrice: string | undefined;
  destPrice: string | undefined;
  fadeInContainer  = false;

  constructor(
    private service: TaxipilotService,
    private fb: FormBuilder,
    private cookieServices: CookieServices
  ) {}
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }


  // #region Lifecycle Hooks
  ngOnInit(): void {
    const today = new Date();
    const futureDate = this.addMonths(today, 4);
    const newDate = new Date(today.setDate(today.getDate() + 1));
    this.fCtrlTime = '00:00';
    this.fCtrlDate = newDate.toDateString();

    this.minDate = this.formatDate(this.addDays(today, 1));
    this.maxDate = this.formatDate(futureDate);
    this.fCtrlDate = this.minDate

    // Initialize the form with validators
    this.form = this.fb.group({
      isAirportPickup: [false], // Checkbox for toggling airport dropdown
      airport: ['', Validators.required],       // Airport dropdown
      inputPickup: ['', Validators.required],        // Autocomplete input
      inpDest: ['', Validators.required],        // Autocomplete input
      selPickup: ['GWN', Validators.required],   // Select pickup input
      selDestination: ['GWN', Validators.required],   // Destination input
      date: [null, Validators.required],        // Date input
      time: ['00:00', Validators.required],     // Time input
    });

    this.form.controls['inputPickup']?.setValue(this.mobile_location);
    this.form.controls['selPickup']?.setValue('GWS');
    this.form.controls['selDestination']?.setValue('GWS');

    if(this.mobile_postcode === 'RH6 0NN'){
      this.form.patchValue({selPickup: 'Gatwick Airport - South Terminal'});
    }
    if (this.mobile_postcode === 'RH6 0PH'){
      this.form.patchValue({selPickup: 'Gatwick Airport - North Terminal'});
    }

    // Listen for changes to toggle between airport dropdown and address autocomplete
    this.form.get('isAirportPickup')?.valueChanges.subscribe((checked) => {
      this.onTogglePickupType(checked);
    });

    setInterval(() => {
      this.fadeInContainer  = true;
    }, 3000); // 3 seconds delay
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  // #endregion

  // #region HTML events
  onInputPickupChanged($event: Event) {
    console.log($event)
    this.inputPickup = this.inputDest;
    this.inputDest = this.inputPickup;
    }

  onSelectionChange($event: any) {
      console.log($event)
      this.selPickup = $event;
      this.selDest = $event;
    }

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
    this.isAirportPickup = isChecked;
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

  addressSelectedParent($event: any) {
    this.inputPickup = $event
    this.inputPickup = $event

    // this.address = $event;
    // if (ispickupOrDest == 'pickup') {
    //   this.addressPickup = $event;

    //   //this.form.get('pickup')?.setValue(this.addressPickup);
    //   console.log('this.addressPickup->', this.addressPickup);
    // }
    // if (ispickupOrDest == 'dest') {
    //   this.addressDest = $event;
    //   this.form.get('selDestination')?.setValue(this.addressDest);
    //   console.log('this.addressDest ->',this.addressDest);
    // }
  }

  // #endregion

  // #region Submit
  onSubmit() {
    console.log('onSubmit clicked');

    if (!this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.showPricePanel = true;
    this.isLoading = true; // Show loading spinner
    this.showLoading = true;
    const dateTime = `${this.form.get('date')?.value}T${
      this.form.get('time')?.value
    }:00`;
    this.pickupDateTime = Math.floor(new Date(dateTime).getTime() / 1000);

    const _driverBase = this.driverLocation;

    this.pickupPrice = this.selPickup;
    this.destPrice = this.inputPickup;

    if(this.isAirportPickup)
    {
    this.pickupPrice = this.inputPickup;
    this.destPrice = this.selPickup;
    }

    const _apCharges = '6';
    const _radiusDist = '6';

    this.fareInfo$ = this.service
      .getGoogleMapInfo(
        `${_apCharges}`,
        `${_radiusDist}`,
        `${this.form.get('date')?.value}|${this.form.get('time')?.value}`,
        _driverBase,
        this.pickupPrice,
        this.destPrice
      )
      .pipe(
        delay(2000),
        tap(() => {
          // #region Check visitor email in LOCAL STORAGE
    //checl if user email cookie exists
    if (
      this.cookieServices.getCookie(COOKIE_VISITOR_EMAIL_ADDRESS_KEY) !==
      undefined
    ) {

      this.showRegistration = true;
      // present a dislog box to ask user to enter his/her email - user might have set to to accept cookie message
      // then you can ask again

      return;
    } else {
      this.showLoading = false;
    }
    // #endregion
        }),
        map((fareInfo) => {
          // this.addressPickup = fareInfo.pickup;




          return fareInfo;
        })
      );

    this.fareInfo$
      .pipe(
        tap((p) => {
          this.fareInfoReceived = true;
          console.log("Pickup->", p.pickup);
          console.log("Dest->", p.dest);
          console.log("Fare->", p.fare);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (info) => console.log(info),
        (error) => {
          console.error(error);
          this.isLoading = false;
        }
      );

    this.service.getSettings().subscribe({
      next: (data) => {
        this.driverBase = data.filter(
          (x) => x.settingKey == 'Base'
        )[0].settingValue;
        console.log(
          'Base:',
          data.filter((x) => x.settingKey == 'Base')[0].settingValue
        );
        console.log('Fetched settings:', data);
        return data;
      },
      error: (error) => {
        // eslint-disable-next-line no-debugger
        debugger; // Inspect error details
        console.error('Error fetching settings:', error);
      },
    });
  }
  // #endregion

  // #region Custom Events
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  private addMonths(date: Date, months: number): Date {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
  }

  private addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  onTimeSelected(event: WheelEvent): void {
    const input = event.target as HTMLInputElement;
    const currentValue = input.value;

    if (currentValue) {
      const minutes = 0;
      let [hours] = currentValue.split(':').map(Number);

      if (event.deltaY < 0) {
        if (hours === 23) {
          hours = 0;
        } else {
          hours++;
        }
      } else {
        if (hours === 0) {
          hours = 23;
        } else {
          hours--;
        }
      }

      const newTime = `${hours < 10 ? '0' + hours : hours}:${
        minutes < 10 ? '0' + minutes : minutes
      }`;
      input.value = newTime;
      this.form.get('time')!.setValue(newTime, { emitEvent: false });

      event.preventDefault();
    }
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
}
