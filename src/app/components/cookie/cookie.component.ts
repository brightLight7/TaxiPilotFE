import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cookie',
  templateUrl: './cookie.component.html',
  styleUrls: ['./cookie.component.scss']
})
export class CookieComponent implements OnInit {
  showPopup: boolean | undefined;

  ngOnInit(): void {
    this.showPopup = localStorage.getItem('cookiesAccepted') == undefined ? true : false;
    localStorage.removeItem('cookiesAccepted');
  }

  rejectCookies() {
  localStorage.setItem('cookiesAccepted', 'false');
  this.showPopup = false;
}

clearCookies(){
  localStorage.removeItem('cookiesAccepted');
  this.showPopup = false;
}


  acceptCookies() {
    localStorage.setItem('cookiesAccepted', 'true');
    this.showPopup = false;
  }
}
