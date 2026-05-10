import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export default class CookieServices {

  constructor(private cookieService: CookieService) {}

  setCookie(cookie: string, value: string, expiesDays :number) {
  this.cookieService.set(cookie, value, expiesDays)
 }

 deleteCookie(cookie: string) {
  this.cookieService.delete(cookie)
 }

 getCookie(cookie: string) {
  return this.cookieService.get(cookie)
 }
}
