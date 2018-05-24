import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store/store';
import { UsersActions } from '../../redux/users.actions';
import { Player } from '../../entities/player';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TeamsActions } from '../../redux/teams.actions';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit, OnDestroy {
    teamInvites:number;
    isLoggedIn:boolean;
    isAdmin:boolean;
    user:Player;
    subscription;
    userSubscription;
    loggedInSubscription;
    loggedInSubscriptionHit:boolean = false;
  constructor(private ngRedux: NgRedux<IAppState>, private usersActions: UsersActions, private teamsActions:TeamsActions, private router: Router, private authService:AuthService) { }

  ngOnInit() {
    this.usersActions.getUsers();
    this.teamsActions.getTeams();

    this.userSubscription = this.ngRedux.select(state => state.users.user).subscribe(user => {
        if(user && user != undefined){
            this.teamsActions.getMyTeams(user.username);
            this.usersActions.getTeamInvites(user.username);
            this.user = user; // DOESNT UPDATE DATABINDED HTML?
            this.isLoggedIn = true;
            this.isAdmin = user.isAdmin
        }else{
            this.isLoggedIn = false;
            this.isAdmin = false;
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
                
                if(loggedIn.loggedInWithForm){
                    this.router.navigate(['app/home'])
                }
            }else{
                this.authService.logout();
                this.router.navigate(['app/login'])
                
            }
        }else{
            this.loggedInSubscriptionHit = true;
        }
    });
    if(localStorage.tuLoginSession && localStorage.tuLoginSessionId){
      console.log('LOGGING IN BY SESSION')
      this.usersActions.loginBySession(localStorage.tuLoginSession, localStorage.tuLoginSessionId);

    }
  }
  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  userLogout(){
    this.usersActions.userLogout(localStorage.tuLoginSessionId);
  }

}
