import { Component, OnInit, OnDestroy } from '@angular/core';
import { Team } from '../entities/team';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store/store';
import { TeamsActions } from '../redux/teams.actions';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-team',
  templateUrl: './list-team.component.html',
  styleUrls: ['./list-team.component.scss']
})
export class ListTeamComponent implements OnInit, OnDestroy {
  // listTeamForm:FormGroup;
  teamList:Team[];
  selectedTeam:Team;
  subscription;
  constructor(private ngRedux: NgRedux<IAppState>, private fb: FormBuilder, private teamsActions:TeamsActions, private router:Router) { }

  ngOnInit() {
    this.subscription = this.ngRedux.select(state => state).subscribe(data => {
      this.teamList = data.teams.teams;
    });
  }
  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
  listTeam(){
    console.log(this.selectedTeam)
    this.teamsActions.listTeam(this.selectedTeam);
    this.router.navigate(['app/teams']);
  }
  onTeamChanged(event:Event, team:Team){
    console.log('change');
  }
  // createForm(team:Team) {
  //   this.listTeamForm = this.fb.group({
  //      name: [team.name, Validators.required],
  //      members: [team.members],
  //   });
  // }

}
