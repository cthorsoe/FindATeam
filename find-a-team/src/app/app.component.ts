import { Component, OnInit } from '@angular/core';
import { UsersActions } from './redux/users.actions';
import { TeamsActions } from './redux/teams.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {

  constructor (private usersActions: UsersActions, private teamsActions: TeamsActions){

  }
  ngOnInit(): void {
    this.usersActions.getUsers();
    this.teamsActions.getTeams();
 }
}
