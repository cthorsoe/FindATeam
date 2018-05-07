import { Component, OnInit } from '@angular/core';
import { UsersActions } from './redux/users.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {

  constructor (private usersAction: UsersActions){

  }

  ngOnInit(): void {
    this.usersAction.getUsers();
 }
}
