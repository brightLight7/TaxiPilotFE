import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { COOKIE_VISITOR_EMAIL_ADDRESS_KEY } from 'src/app.constants';
import { Employee } from 'src/app/model/Employee';
import { GeocodingService } from 'src/app/shared/services/location-services/geocoding.service';
import { LocationService } from 'src/app/shared/services/location-services/location.service';
import { PickupAddressService } from 'src/app/shared/services/location-services/pickup-address.service';
import { TaxipilotService } from 'src/app/shared/services/taxipilot.service';
import CookieServices from 'src/app/shared/utlities/cookies';
import { AppFacade } from 'src/app/store/app.facade';
import { CONSTANTS } from 'src/app/shared/constants/constants';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  showQuoteWindow = CONSTANTS.SHOW_QUOTE_WINDOW;

  showQuote: boolean | undefined;
  employee$!: Observable<Employee[]>;
  sessionId: string | undefined;
  address = '';
  showRegistration = false;

  ngOnInit(): void {
    this.showQuoteWindowDelay();
    this.address = this.pickupAddressService.getLocation();

    this.appFacade.setShowQuoteWindow(CONSTANTS.SHOW_QUOTE_WINDOW);

    this.appFacade.showRegistration$.subscribe(
      (data) => (this.showRegistration = data)
    );

    this.appFacade.showQuoteWindow$.subscribe((x) => {
        this.showQuoteWindow = x;
    });
  }

  // #region Custom events
  private showQuoteWindowDelay() {
    this.showQuote = false;
    setTimeout(() => (this.showQuote = true), 4000);
  }

  getSessionId(showConsole: boolean) {
    const sId = document.cookie
      .split('; ')
      .find((row) => row.startsWith('sessionId='))
      ?.split('=')[1];

    if (showConsole == true) console.log('Session Id ->', sId);
    return sId;
  }

  // Scroll to the top of the page
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Adds smooth scrolling
    });
  }

  showQuoteWindow2(show: boolean) {
    this.appFacade.setShowQuoteWindow(show);
    this.appFacade.setDisableGlobal(true);
    this.showQuoteWindow = show;
  }
  // #endregion

  constructor(
    private appFacade: AppFacade,
    private service: TaxipilotService,
    private cookieServices: CookieServices,
    private pickupAddressService: PickupAddressService
  ) {}
}
