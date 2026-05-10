import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TaxipilotService } from 'src/app/shared/services/taxipilot.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppFacade } from 'src/app/store/app.facade';
import { Observable } from 'rxjs';

import { SignalRService } from 'src/app/shared/services/signalr.service';
import { UserLogin } from 'src/app/shared/models/user.model';
@Component({
  selector: 'app-register-login-2',
  templateUrl: './register-login-2.component.html',
  styleUrls: ['./register-login-2.component.scss'],
})
export class RegisterLogin2Component implements OnInit, OnDestroy {

  siteKey = '6LeNfYEqAAAAANwFXiJMvMZRzuDozKlIm1oG-8k9'; // Replace with your Google reCAPTCHA site key
  captchaResolved = false;
  token: string | null = null;
  baseUrl: string | undefined;
  emailVerifiedSuccessfully = false;
  registerForm!: FormGroup;
  emailSent$: Observable<boolean> | undefined;
  emailSent2 = false;
  visitorRegister = true;
  visitors!: UserLogin[];

  @Input() login = true; // Determines whether to show login or register dialog
  @Input() emailContinue = false; // Determines whether to show login or register dialog
  popupMSg = "";


  // #region Hooks
  ngOnInit(): void {
    //this.getSignalRAlert();

    this.signalRService.initializeConnection();

    this.signalRService.on('ReceiveAlert', (message: string) => {
      this.emailSentMessage = `Thank you! Your email has been successfully verified. Login to your account.`;
      this.emailVerifiedSuccessfully = true;
      this.showEmailVerificationAlert = false;
      //this.insertUser();

      setTimeout(() => {
        this.login = true;
      }, 3000);
    });

    this.registerForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        emailHash: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', Validators.required],
        passwordHash: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        notRobot: [false, Validators.requiredTrue] // ✅ Ensure checkbox is checked
      },
      { validator: this.passwordMatchValidator }
    );

    this.emailSent$ = this.appFacade.emailSent$

    this.appFacade.emailSent$.subscribe((x) => {
      if (x == true) {
        this.showEmailVerificationAlert = true;
        this.emailSentMessage =
          'A verification email is sent to your email address. Please verify your email address.';
      }
    });
  }

  ngOnDestroy(): void {
    this.signalRService.stopConnection();
  }
  // #endregion

  // #region Captcha
  onCaptchaResolved(captchaResponse: string) {
    console.log('Captcha response:', captchaResponse);
    this.captchaResolved = !!captchaResponse; // Set to true if captcha is resolved
  }
  // #endregion

  signUp() {

    const btnRegister = document.getElementById('registerUser');
    const btnLogin = document.getElementById('loginUser');

    btnRegister?.classList.add('active');
    btnLogin?.classList.remove('active');

    this.login = false;
  }

  loginUser() {
    const btnRegister = document.getElementById('registerUser');
    const btnLogin = document.getElementById('loginUser');

    btnLogin?.classList.add('active');
    btnRegister?.classList.remove('active');

    this.login = true;
  }

  isBlurPassword = false;
  emailSentMessage = 'All fields are mandatory.';
  showEmailVerificationAlert = false;
  blurPasswords(isBlur: boolean) {
    this.isBlurPassword = isBlur;
  }

  onEmailToContinue() {
    // this.service.sendEmail(this.registerForm.controls['registerEmail'].value, 'Verification');
  }

  // Form data for login
  loginEmail = '';
  loginPassword = '';
  isBot: boolean = false;
  // Form data for registration

  // #region HTML Events
  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const password = group.get('passwordHash')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  // Method for handling login submission
  onLogin() {
    if (this.loginEmail && this.loginPassword) {
      console.log('Login attempt with email:', this.loginEmail);
      this.appFacade.setIsUserLoggedIn(true);
      this.appFacade.setShowRegisterLogin(false);
      // Add authentication service or logic here
      this.isBot = this.detectBot();

    } else {
      console.error('Login form is incomplete.');
    }
  }

  private detectBot(): boolean {
    const botRegex = /bot|googlebot|crawler|spider|robot|crawling/i;
    return botRegex.test(navigator.userAgent);
  }

  // Method for handling registration submission
  onRegister() {
    if (
      this.registerForm.controls['emailHash'].value && this.registerForm.controls['passwordHash'].value && this.registerForm.controls['confirmPassword'].value
    ) {
      if (
        this.registerForm.controls['passwordHash'].value === this.registerForm.controls['confirmPassword'].value &&
        this.registerForm.controls['passwordHash'].value.length > 7 && this.registerForm.controls['confirmPassword'].value.length > 7
      ) {

        const formData = new FormData();
          Object.keys(this.registerForm.controls).forEach((key) => {
          formData.append(key, this.registerForm.get(key)?.value);
        });

        if (this.registerForm.valid) {
          this.service.sendEmail(this.registerForm.controls['emailHash'].value,'Verification', formData);
          this.emailSentMessage
          this.appFacade.msg$.subscribe((m) => {
            if(m.split('|').length > 0){
              this.popupMSg = m;
            }
          });

          // this.service.insertUserLogin(formData, this.registerForm.controls['emailHash'].value);
          // this.appFacade.msg$.subscribe((msg) => {
          //     this.popupMSg = msg; //msg: Successfully user added  OR Already exists
          // });
        } else {
          console.log('Form is invalid:', this.registerForm.errors);
        }


      }
    }
  }

  validatePassword(password: string): boolean {
    const pattern = /^[A-Za-z0-9]+$/; // Allow only A-Z, a-z, and numbers (no special characters)
    const consecutiveLettersPattern = /([a-zA-Z])\1/; // Match two consecutive identical letters

    return pattern.test(password) && !consecutiveLettersPattern.test(password);
  }
  constructor(private fb: FormBuilder,
    private service: TaxipilotService,
    private http: HttpClient,
    private appFacade: AppFacade,
    private signalRService: SignalRService
  ) {
    const today = new Date();
  }
}

  //   onSubmit(): void {
  //     if (this.captchaResolved && this.token) {
  //         this.http.post('/api/verify-captcha', { token: this.token })
  //             .subscribe(response => {
  //                 console.log('CAPTCHA verified successfully!', response);
  //             }, error => {
  //                 console.error('CAPTCHA verification failed!', error);
  //             });
  //     } else {
  //         console.error('Please resolve the CAPTCHA.');
  //     }
  // }
  // #endregion

  // #region SignalR
  // getSignalRAlert() {


  //   const connection = new signalR.HubConnectionBuilder()
  //     .withUrl(`${this.baseUrl}alerthub`) // The URL to your SignalR hub
  //     .build();

  //   // Handle the event that will be triggered by the server
  //   connection.on('ReceiveAlert', (message: string) => {
  //     this.emailSentMessage = `Thank you! Your email has been successfully verified. Login to your account.`;
  //     this.emailVerifiedSuccessfully = true;
  //     this.showEmailVerificationAlert = false;
  //     this.insertUser();
  //     setInterval(() => {
  //       this.login = true;
  //     }, 3000);
  //   });

  //   // Start the connection
  //   connection
  //     .start()
  //     .then(() => {
  //       console.log('SignalR connection established');
  //     })
  //     .catch((err) => {
  //       console.error('SignalR connection error: ', err);
  //     });
  // }
  // #endregion
