import { showMobileView } from './store/app/app.actions';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AppActions from '../app/store/app/app.actions';
import { Observable } from 'rxjs';
import { AppFacade } from './store/app.facade';
import { HttpClient } from '@angular/common/http';
import { ToastComponent } from './toast/toast.component';
import { environment } from 'src/environments/environment';
import { trackUser } from '../app/shared/utlities/trackUser';
import { TaxipilotService } from './shared/services/taxipilot.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  siteKey = '6Lcui4EqAAAAAMKSdqLyxGdvpa1tC-6ODSD3YYOo';
  title = 'TaxiPilotNG';
  addressFormGroup: FormGroup | undefined;
  showMobileView: Observable<boolean> | undefined;

  ngOnInit(): void {

    trackUser(this.taxiPilotService);

    this.injectGoogleMapsApiKey();
    this.addressFormGroup = new FormGroup({
      address: new FormControl(),
    });




    this.addRecaptchaScript();


    //this.appFacade.setShowMobileView(true);
    //this.store.dispatch(AppActions.showMobileView({showMobileView: false}));
    //this.showMobileView = this.appFacade.;
  }


  addRecaptchaScript(): void {
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/enterprise.js?render=${this.siteKey}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      console.log('reCAPTCHA script loaded');
      this.executeRecaptcha();
    };
    document.body.appendChild(script);
  }

  executeRecaptcha(): void {
    grecaptcha.ready(() => {
      grecaptcha.enterprise.execute(this.siteKey, { action: 'submit' }).then(token => {
        console.log('CAPTCHA token:', token);
        // Send token to backend for validation
        this.http.post('/api/verify-captcha', { token }).subscribe(response => {
          console.log('CAPTCHA verified:', response);
        });
      });
    });
  }

  injectGoogleMapsApiKey(): void {
    const script = document.getElementById('google-maps-script') as HTMLScriptElement | null;

    if (script) {
      // ✅ Append the API key to the script URL dynamically
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCD-JdwXp5VHHiwb9G42PbqEbVGuN0h6TA&libraries=places`;

      script.onload = () => {
        console.log('Google Maps API script loaded successfully.');
        window.dispatchEvent(new Event('google-maps-loaded')); // ✅ Trigger event when ready
      };

      script.onerror = (error) => {
        console.error('Error loading Google Maps API:', error);
      };
    } else {
      console.error('Google Maps script tag not found in index.html');
    }
  }



  // initializeGoogleServices(): void {
  //   if (typeof google !== 'undefined' && typeof google.maps !== 'undefined') {
  //     console.log('Initializing Google Services...');
  //     this.initAutocomplete();
  //   } else {
  //     console.error('Google Maps API is not available yet.');
  //   }
  // }



  constructor(private taxiPilotService: TaxipilotService, private store: Store, private appFacade: AppFacade, private http: HttpClient) {}
}
