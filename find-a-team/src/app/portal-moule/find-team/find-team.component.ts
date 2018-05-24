import { Component, OnInit, OnDestroy } from '@angular/core';
import { Team } from '../../entities/team';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store/store';
import { TeamsActions } from '../../redux/teams.actions';

@Component({
  selector: 'app-find-team',
  templateUrl: './find-team.component.html',
  styleUrls: ['./find-team.component.scss']
})
export class FindTeamComponent implements OnInit, OnDestroy {
  teamList:Team[];
  teamSearch:string;
  subscription;

  constructor(private ngRedux: NgRedux<IAppState>, private teamsActions: TeamsActions) { }

  ngOnInit() {
    this.subscription = this.ngRedux.select(state => state).subscribe(data => {
      this.teamList = data.teams.listedTeams;
    });
  }
  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
