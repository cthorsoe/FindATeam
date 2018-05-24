import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardAdminService implements CanActivate {

    constructor(private router: Router, private authService: AuthService){

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        console.log('state.url', state.url);
        let url: string = state.url;

        return this.checkAdmin();
    }
    checkAdmin(): boolean { 
        console.log('CHECKING ADMIN')
        if(this.authService.isAdmin){
           return true;
        }
        console.log('This view requires admin! Returned to ' + this.authService.redirectUrl);
        // console.log('redirectUrl', this.authService.redirectUrl);
        this.router.navigate([this.authService.redirectUrl]);
        return false;
    }

}
