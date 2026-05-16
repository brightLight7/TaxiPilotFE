import { Injectable } from '@angular/core';
import { Observable, throwError, catchError, tap, retry } from 'rxjs';
import { GoogleMapInfo } from '../../model/google-map-api.model';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Employee } from 'src/app/model/Employee';
import { SettingLk } from 'src/app/model/SettingLk';
import { EMAIL_VERIFICATION_TEMPLATE, VERIFiCATION_BODY } from '../emailTemplates/email-verification';
import { AppFacade } from 'src/app/store/app.facade';
import { CONSTANTS } from '../constants/constants';
import { UserLogin } from '../models/user.model';
import { Visitor } from '../models/visitor.model';
import { ToastService } from './toast-service.component';
import { ApiResponse } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TaxipilotService {

  fetchUsers(): Observable<UserLogin[]> {
    return this.http.get<UserLogin[]>(`${this.baseUrl_TaxiPilotAPI}fetchUserFields`);
  }

  fetchUser(id: number): Observable<UserLogin[]> {
    return this.http.get<UserLogin[]>(`${this.baseUrl_TaxiPilotAPI}fetchUser/${id}`);
  }

  insertUser(user: UserLogin): Observable<UserLogin> {
    return this.http.post<UserLogin>(`${this.baseUrl_TaxiPilotAPI}insertUser`, user);
  }

  baseUrl: string;
  baseUrl_TaxiPilotAPI: string;
  baseUrl_Arch360API: string;
  baseUrl_GoogleMapAPI: string;
  baseUrl_SendEmail: string;
  htmlBody: string | undefined;

  constructor(private http: HttpClient,
    private toastService: ToastService,
    private appFacade: AppFacade) {
    this.baseUrl = CONSTANTS.BASE_URL;
    this.baseUrl_SendEmail = `${this.baseUrl}api/EmailSender/`;
    this.baseUrl_Arch360API = `${this.baseUrl}api/Arch360/`;
    this.baseUrl_GoogleMapAPI = `${this.baseUrl}api/GoogleMapAPI/`;
    this.baseUrl_TaxiPilotAPI = `${this.baseUrl}api/TaxiPilotAPI/`;
  }

  // #region User
  fetchUserLogins(): Observable<UserLogin> {
    return this.http.get<UserLogin>(`${this.baseUrl_TaxiPilotAPI}fetchUserLogins`);
  }

  insertUserLogin(formData: FormData, recipientEmail: string) {
    const url = `${this.baseUrl_TaxiPilotAPI}insertUserLogin`;
    this.http.post<ApiResponse>(url, formData, { responseType: 'json' }).subscribe(
      response => {
        if (response.message === 'Exists') {
          this.appFacade.setGlobalMsg('Error|User already exists!');
          console.log('User already exists!');
        } else {
          //this.appFacade.setGlobalMsg('Success|User registered successfully!'); //Add the user here but the email need to be verified...
          this.appFacade.setGlobalMsg('Warning|Please your verify email!'); //Add the user here but the email need to be verified...
          console.log('User registered successfully!');
          this.sendEmail(recipientEmail, "Email Verifications",formData)
        }
      },
      error => this.handleError(error)
    );
  }
  // #endregion

  // #region Google Map Info
  getGoogleMapInfo(apCharges: string, radiusDistance: string, pickupDateTime: string, driverlocation: string, pickup: string, dest: string): Observable<GoogleMapInfo> {
    const url = `${this.baseUrl_GoogleMapAPI}getRouteInfo/${apCharges}/${radiusDistance}/${pickupDateTime}/${driverlocation}/${pickup}?dest=${dest}`;
    return this.http.get<GoogleMapInfo>(url).pipe(catchError(this.handleError));
  }
  // #endregion

  // #region Send Email
  sendEmail(recipientEmail: string, subject: string, formData: FormData) {
    this.htmlBody = EMAIL_VERIFICATION_TEMPLATE("info@thearch360.com", `${this.baseUrl_SendEmail}verify-email/email?email=${recipientEmail}`);

    const emailRequest = { recipientEmail, subject: 'Verification', body: this.htmlBody };

    const user = this.http.get(`${this.baseUrl_TaxiPilotAPI}fetchUserLoginByEmail/${recipientEmail}`);
    user.subscribe(x => {
      if (!x) {
        this.http.post(`${this.baseUrl_SendEmail}sendEmail`, emailRequest)
          .subscribe(
            response => console.log('Email sent successfully', response),
            error => this.appFacade.setEmailSent(error.status === 200)
          );
        this.appFacade.setGlobalMsg('Success|A verification email is sent to your email address. Please verify your email address.');
        //once email is sent then user will verify the email. and then in notification part in API. user will be added to th database.
      } else {
        this.appFacade.setGlobalMsg('This email is already registered. Please login.');
      }
    });
  }
  // #endregion

  // #region Visitors
  getVisitors(filters?: { page?: number; limit?: number; search?: string }): Observable<Visitor[]> {
    let params = new HttpParams();
    if (filters) {
      if (filters.page) params = params.set('page', filters.page);
      if (filters.limit) params = params.set('limit', filters.limit);
      if (filters.search) params = params.set('search', filters.search);
    }
    return this.http.get<Visitor[]>(`${this.baseUrl_TaxiPilotAPI}fetchVisitors`, { params })
      .pipe(retry(2), catchError(this.handleError));
  }

  getVisitorById(id: number): Observable<Visitor> {
    return this.http.get<Visitor>(`${this.baseUrl_TaxiPilotAPI}fetchVisitor/${id}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  insertVisitor(visitor: Visitor) {
    console.log("🚀 Sending Visitor Data:", JSON.stringify(visitor, null, 2)); // Debugging

    // return this.http.get<string>(
    //   `${this.baseUrl_TaxiPilotAPI}insertVisitor2`).pipe(catchError(this.handleError));

    return this.http.post<Visitor>(
      `${this.baseUrl_TaxiPilotAPI}insertVisitor`, visitor).pipe(catchError(this.handleError));
  }

  updateDeletedFlag(id: number, deletedFlag: boolean): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl_TaxiPilotAPI}logicdeleteVisitor/${id}`, { deletedFlag })
      .pipe(catchError(this.handleError));
  }

  deleteVisitor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl_TaxiPilotAPI}deleteVisitor/${id}`)
      .pipe(catchError(this.handleError));
  }
  // #endregion

  /**
   * Error handling method
   * @param error HTTP error response
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Server Error (${error.status}): ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  getSettings(): Observable<SettingLk[]> {
    const url = `${this.baseUrl_TaxiPilotAPI}fetchSettingLks`;
    return this.http.get<SettingLk[]>(url).pipe(catchError(this.handleError.bind(this)));
  }
}
