import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { User } from '../../entities/user';
import { UsersActions } from '../../redux/users.actions';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store/store';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
    username:String;
    user:User = new User();
    routeSubscription;
    subscription;
  constructor(private route: ActivatedRoute, private usersActions:UsersActions, private ngRedux:NgRedux<IAppState>) {}

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.username = params.username;
      this.usersActions.getSpecificUser(this.username);
      this.subscription = this.ngRedux.select(state => state.users).subscribe(data => {
        // console.log('RESPONSE', data);
        if(data.selectedUser != undefined){
          this.user = data.selectedUser;
        }
      });
    });
  }
  ngOnDestroy(){

  }

}
