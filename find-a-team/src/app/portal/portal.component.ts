import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store/store';
import { UsersActions } from '../redux/users.actions';
import { Player } from '../entities/player';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TeamsActions } from '../redux/teams.actions';

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
    usersSubscription;
    teamsSubscription;
    constructor(private ngRedux: NgRedux<IAppState>, private usersActions: UsersActions, private teamsActions: TeamsActions, private router: Router, private authService:AuthService) { }

  ngOnInit() {
    this.teamsSubscription = this.ngRedux.select(state => state.teams).subscribe(data => {
        console.log('teamInvites', data.teamInvites);
        if(this.teamInvites > data.teamInvites.length){
    
        }
        this.teamInvites = data.teamInvites.length;
    });
    this.usersSubscription = this.ngRedux.select(state => state.users).subscribe(data => {
        if(data.user != undefined){
            this.user = data.user; // DOESNT UPDATE DATABINDED HTML?
        this.isLoggedIn = true;
        this.isAdmin = data.user.isAdmin
      }else{
        this.user = undefined;
        this.isLoggedIn = false;
      }
    });
  }
  ngOnDestroy(){
    if(this.usersSubscription){
      this.usersSubscription.unsubscribe();
    }
    if(this.teamsSubscription){
        this.teamsSubscription.unsubscribe();
      }
  }

  userLogout(){
    this.usersActions.userLogout(localStorage.tuLoginSessionId);
  }

}
