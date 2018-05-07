import { Component, OnInit, OnDestroy } from '@angular/core';
import { Player } from '../entities/player';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store/store';
import { Router } from '@angular/router';
import { UsersActions } from '../redux/users.actions';

@Component({
  selector: 'app-find-player',
  templateUrl: './find-player.component.html',
  styleUrls: ['./find-player.component.scss']
})
export class FindPlayerComponent implements OnInit, OnDestroy {
  playerList:Player[];
  playerSearch:string;
  subscription;

  constructor(private ngRedux: NgRedux<IAppState>, private usersActions: UsersActions) { 
  }

  ngOnInit() {
    this.subscription = this.ngRedux.select(state => state.users).subscribe(data => {
      this.playerList = data.listedUsers;
    });
  }
  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

}
