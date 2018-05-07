import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store/store';
import { UsersActions } from '../redux/users.actions';
import { Player } from '../entities/player';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit, OnDestroy {
  isLoggedIn:boolean;
  isAdmin:boolean;
  user:Player;
  subscription;
  constructor(private ngRedux: NgRedux<IAppState>, private usersActions: UsersActions, private router: Router) { }

  ngOnInit() {
    this.subscription = this.ngRedux.select(state => state.users).subscribe(data => {
      if(data.user != undefined){
        // this.user = data.user; // DOESNT UPDATE DATABINDED HTML?
        this.isLoggedIn = true;
      }else{
        // this.user = undefined;
        this.isLoggedIn = false;
      }
    });
  }
  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  userLogout(){
    console.log('USER LOGOUT');
    this.usersActions.userLogout();
    this.router.navigate(['app/home']);
  }

}
