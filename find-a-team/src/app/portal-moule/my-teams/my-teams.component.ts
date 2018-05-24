import { Component, OnInit, OnDestroy } from '@angular/core';
import { Team } from '../../entities/team';
import { IAppState } from '../../store/store';
import { NgRedux } from '@angular-redux/store';
import { TeamsActions } from '../../redux/teams.actions';

@Component({
  selector: 'app-my-teams',
  templateUrl: './my-teams.component.html',
  styleUrls: ['./my-teams.component.scss']
})
export class MyTeamsComponent implements OnInit, OnDestroy {
  teamList:Team[];
  // teamSearch:string;
  subscription;
  constructor(private ngRedux: NgRedux<IAppState>, private teamsActions: TeamsActions) { }

  ngOnInit() {
    this.subscription = this.ngRedux.select(state => state).subscribe(data => {
      this.teamList = data.teams.teams;
    });
    // this.teamsActions.getMyTeams();
  }
  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

}
