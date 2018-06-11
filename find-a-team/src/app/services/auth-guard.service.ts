import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate  {;
    constructor( private router: Router, private authService: AuthService){
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        console.log('state.url', state.url);
        let url: string = state.url;

        return this.checkLogin(url);
    }

    checkLogin(url: string): boolean {
            console.log('Logged In', this.authService.isLoggedIn, 'Admin', this.authService.isAdmin);
            this.authService.redirectUrl = url;
            console.log('URL SET TO', url)
            if (this.authService.isLoggedIn) { 
                return true; 
            }
            console.log(localStorage.tuLoginSession, localStorage.tuLoginSessionId, !this.authService.sessionLoginFailed,!(localStorage.tuLoginSession && localStorage.tuLoginSessionId && !this.authService.sessionLoginFailed));
            if(!(localStorage.tuLoginSession && localStorage.tuLoginSessionId && !this.authService.sessionLoginFailed)){
                this.router.navigate(['app/login']);
            }
    }

  getUserRoles(){
     return { isLoggedIn: this.authService.isLoggedIn, isAdmin: this.authService.isAdmin };
  }
}
