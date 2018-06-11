import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { AuthGuardService } from './auth-guard.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
    isLoggedIn = false;
    isAdmin = false;
    sessionLoginFailed = false;
    redirectUrl: string;
    constructor(private router:Router) { }

    login(isAdmin:boolean = false): void {
        this.isLoggedIn = true;
        this.isAdmin = isAdmin; 
    }
    
    logout(): void {
        this.isLoggedIn = false; 
    }

    failedSessionLogin(){
        this.sessionLoginFailed = true;
        delete localStorage.tuLoginSession;
        delete localStorage.tuLoginSessionId;
        if(this.redirectUrl){
            this.router.navigate([this.redirectUrl]);
        }
    }

}
