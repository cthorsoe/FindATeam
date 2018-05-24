import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersActions } from './redux/users.actions';
import { TeamsActions } from './redux/teams.actions';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from './store/store';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { Action } from './entities/action';
import { Event } from './entities/event';
import { SocketService } from './services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [SocketService]
})
export class AppComponent implements OnInit, OnDestroy  {
    action = Action;
    userSubscription;
    loggedInSubscription;
    loggedInSubscriptionHit:boolean = false;
    ioConnection: any;
    userId:number;
    constructor (private ngRedux:NgRedux<IAppState>, private usersActions: UsersActions, private teamsActions: TeamsActions, private authService:AuthService, private router:Router, private socketService: SocketService){

    }
    ngOnInit(): void {
        this.usersActions.getUsers();
        this.teamsActions.getTeams()
        this.userSubscription = this.ngRedux.select(state => state.users.user).subscribe(user => {
            if(user && user != undefined){
                this.teamsActions.getMyTeams(user.username);
                this.usersActions.getTeamInvites(user.username);
                this.userId = user.id;
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
                    this.initIoConnection();
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
        // console.log(localStorage.tuLoginSession, localStorage.tuLoginSessionId)
        if(localStorage.tuLoginSession && localStorage.tuLoginSessionId){
            console.log('LOGGING IN BY SESSION')
            this.usersActions.loginBySession(localStorage.tuLoginSession, localStorage.tuLoginSessionId);
        }
    }
    private initIoConnection(): void {
        console.log('creating io connection')
        this.ioConnection = this.socketService.getInvites().subscribe(invite => {
            console.log('subscription hit')
            if(invite && invite["userId"] == this.userId){
                this.usersActions.addInvite();
            }
        })
    }
    ngOnDestroy() {
        this.ioConnection.unsubscribe();
    }
}
