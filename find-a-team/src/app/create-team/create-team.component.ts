import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Team } from '../entities/team';
import { TeamsActions } from '../redux/teams.actions';
import { IAppState } from '../store/store';
import { NgRedux } from '@angular-redux/store';
import { Player } from '../entities/player';
import { User } from '../entities/user';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss']
})
export class CreateTeamComponent implements OnInit {
  createTeamForm: FormGroup;
  members:User[] = new Array<User>();
  subscription;
  constructor(private ngRedux: NgRedux<IAppState>, private fb: FormBuilder, private teamsActions:TeamsActions, private router:Router) { 
  }

  ngOnInit() {
    this.subscription = this.ngRedux.select(state => state.users.user).subscribe(data => {
      console.log(data);
      this.members.push(data);
      this.createForm(this.members);
    });
  }

  createForm(members) {
    this.createTeamForm = this.fb.group({
       name: ['', Validators.required],
       members: [members]
    });
  }
  createTeamFormSubmit(createTeamForm:FormGroup, event:Event){
    console.log(createTeamForm.value);
    let team:Team = createTeamForm.value as Team; 
    this.teamsActions.createTeam(team);
    this.router.navigate(['/app/my-teams/']);
  }

}
