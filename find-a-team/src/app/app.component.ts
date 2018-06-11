import { Component, OnInit } from '@angular/core';
import { UsersActions } from './redux/users.actions';
import { TeamsActions } from './redux/teams.actions';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from './store/store';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  userSubscription;
  loggedInSubscription;
  failedAutoLoginSubscription;
  loggedInSubscriptionHit:boolean = false;
  constructor (private ngRedux:NgRedux<IAppState>, private usersActions: UsersActions, private teamsActions: TeamsActions, private authService:AuthService, private router:Router){

  }
  ngOnInit(): void {
    this.usersActions.getUsers();
    this.teamsActions.getTeams()
    this.userSubscription = this.ngRedux.select(state => state.users.user).subscribe(user => {
        if(user && user != undefined){
            this.teamsActions.getMyTeams(user.username);
            this.usersActions.getTeamInvites(user.username);
        }
    });
    this.loggedInSubscription = this.ngRedux.select(state => state.users.loggedIn).subscribe(loggedIn => {
        if(this.loggedInSubscriptionHit){

            if(loggedIn && loggedIn.loggedIn){
                let isAdmin = false;
                if(loggedIn.userRole && loggedIn.userRole == "admin"){
                    isAdmin = true;
                }
                this.authService.login(isAdmin);
                
                if(this.authService.redirectUrl != undefined){
                    this.router.navigate([this.authService.redirectUrl]);
                }else if(this.router.url.indexOf('app/login') > -1){
                    this.router.navigate(['app/home']);
                }
            }else{
                this.authService.logout();
                this.router.navigate(['app/login'])
                
            }
        }else{
            this.loggedInSubscriptionHit = true;
        }
    });
    // console.log(localStorage.tuLoginSession, localStorage.tuLoginSessionId)
    if(localStorage.tuLoginSession && localStorage.tuLoginSessionId){
        this.loggedInSubscription = this.ngRedux.select(state => state.users.failedAutoLogin).subscribe(failedAutoLogin => {
            if(failedAutoLogin){
                this.authService.failedSessionLogin();
            }
        });
        console.log('LOGGING IN BY SESSION')
        this.usersActions.loginBySession(localStorage.tuLoginSession, localStorage.tuLoginSessionId);
    }
 }
}
