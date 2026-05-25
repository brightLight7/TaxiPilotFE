import { isDevMode, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AboutComponent } from './components/about/about.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';

import { MaterialModule } from './modules/material/material.module';
import { SharedModule } from './modules/shared.module';
import { AutocompleteInputComponent } from './shared/components/autocomplete-input/autocomplete-input.component';
import { AutocompleteComponent } from './shared/components/autocomplete/autocomplete.component';
import { HttpClientModule } from '@angular/common/http';
import { LoadingPlaceholderComponent } from './shared/components/loading-placeholder/loading-placeholder.component';
import { CarouselQuoteWindowComponent } from './shared/carousels/carousel-quote-window/carousel-quote-window.component';

import { ServicesComponent } from './components/our-services/services.component';
import { WelcomeMessageComponent } from './shared/components/welcome-message/welcome-message.component';

import { CookieService } from 'ngx-cookie-service';
import { QuoteAirportComponent } from './components/quote-airport/quote-airport.component';
import { BgImageComponent } from './components/home/bg-image/bg-image.component';
import { CookieComponent } from './components/cookie/cookie.component';
import { BoxFancyDirective } from './shared/directives/box-fancy.directive';
import { MessageBottomDirective } from './shared/directives/message-bottom.directive';
import { StyledInputDirective } from './shared/directives/input.directive';
import { NavbarMobileComponent } from './components/mobile/navbar/navbar-mobile.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { OurServiceComponent } from './components/home/sections/our-service/our-service.component';
import { WhyChooseUsComponent } from './components/home/sections/why-choose-us/why-choose-us.component';
import { CustomerSayComponent } from './components/home/sections/customer-say/customer-say.component';
import { OurCommitmentComponent } from './components/home/sections/our-commitment/our-commitment.component';
import { MobileQuoteAirportComponent } from './components/mobile/quote-airport/mobile-quote-airport.component';
import { FooterComponent } from './components/footer/footer.component';
import { QuoteWindowComponent } from './components/quote-window/quote-window.component';
import { appReducer } from './store/app/app.reducers';
import { RootState } from './store/root.interface';
import { AppFacade } from './store/app.facade';
import { SelectAirportComponent } from './shared/components/select-aiport/select-airport.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TimeSelectComponent } from './shared/components/time-select/time-select.component';
import { AriaAccessibilityDirective } from './shared/directives/aria-accessibility.directive';
import { MapComponent } from './shared/components/map/map.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { SmInputComponent } from './components/sm-input/sm-input.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormInputComponent } from './shared/components/form-input/form-input/form-input.component';
import { BrandNameComponent } from './shared/components/brand-name/brand-name.component';
import { ToastComponent } from "./toast/toast.component";
import { RegisterLogin2Component } from './components/register-login-2/register-login-2.component';
import { DynamicFormComponent } from './shared/components/dynamic-form/dynamic-form.component';
import { ToastMsgPopupComponent } from './toast-msg-popup/toast-msg-popup.component';
import { HomeTextComponent } from './components/home/home-text/home-text/home-text.component';
import { MessageBarComponent } from './shared/components/message-bar/message-bar.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    BrandNameComponent,
    TimeSelectComponent,
    BoxFancyDirective,
    MessageBottomDirective,
    StyledInputDirective,
    AriaAccessibilityDirective,
    AppComponent,
    WelcomeMessageComponent,
    HomeComponent,
    HomeTextComponent,
    BgImageComponent,
    FooterComponent,
    NavbarComponent,
    AboutComponent,
    ContactUsComponent,
    SmInputComponent,
    AutocompleteInputComponent,
    AutocompleteComponent,
    LoadingPlaceholderComponent,
    CarouselQuoteWindowComponent,
    ServicesComponent,
    CookieComponent,
    QuoteAirportComponent,
    RegisterLogin2Component,
    RegisterLogin2Component,
    NavbarMobileComponent,
    OurServiceComponent,
    WhyChooseUsComponent,
    CustomerSayComponent,
    OurCommitmentComponent,
    MobileQuoteAirportComponent,
    QuoteWindowComponent,
    SelectAirportComponent,
    PrivacyPolicyComponent,
    MapComponent,
    FormInputComponent,
    DynamicFormComponent,
    ToastMsgPopupComponent,
    MessageBarComponent
    ],
    imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot<RootState>({ app: appReducer }),
    StoreDevtoolsModule.instrument({ name: 'TaxiPilotNG App', maxAge: 45, logOnly: !isDevMode() }),
    GoogleMapsModule,
    RecaptchaModule,
    BrowserModule,
    ToastComponent
],
  providers: [CookieService, AppFacade],
  bootstrap: [AppComponent]
})
export class AppModule { }
