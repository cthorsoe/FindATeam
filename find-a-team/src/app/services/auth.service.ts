import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { AuthGuardService } from './auth-guard.service';

@Injectable()
export class AuthService {
  isLoggedIn = false;
  isAdmin = false;
  sessionLoginFailed = false;
  redirectUrl: string;
  constructor() { }

  login(isAdmin:boolean = false): void { // Observable<boolean> { // Use oberservable if you are going to call webservice from here.
    // console.log('login should be true now');
    this.isLoggedIn = true;
    this.isAdmin = isAdmin; 
    // return Observable.of(true).delay(1000).do(() => {
    //   //  localStorage.setItem('FAS-Logged-In', '1');
    //   //  localStorage.setItem('FAS-Admin', isAdmin ? '1' : '0');
    // });
  }
 
 logout(): void {
    this.isLoggedIn = false; 
    // localStorage.setItem('FAS-Logged-In', '0');
    // localStorage.setItem('FAS-Admin', '0');
  }
  failedSessionLogin(){
    console.log('SESSION LOGIN FAILED')
    this.sessionLoginFailed = true;
    // this.authGuardService.checkLogin(this.redirectUrl);

  }

}
