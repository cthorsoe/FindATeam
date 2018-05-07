import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

@Injectable()
export class AuthService {
  isLoggedIn = false;
  isAdmin = false;
  redirectUrl: string;
  constructor() { }

  login(isAdmin:boolean = false): Observable<boolean> {
    // console.log('login should be true now');
    return Observable.of(true).delay(1000).do(() => {
      this.isLoggedIn = true;
      this.isAdmin = isAdmin; 
      //  localStorage.setItem('FAS-Logged-In', '1');
      //  localStorage.setItem('FAS-Admin', isAdmin ? '1' : '0');
    });
  }
 
 logout(): void {
    this.isLoggedIn = false; 
    // localStorage.setItem('FAS-Logged-In', '0');
    // localStorage.setItem('FAS-Admin', '0');
  }

}
