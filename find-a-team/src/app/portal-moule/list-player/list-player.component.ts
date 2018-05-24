import { Component, OnInit } from '@angular/core';
import { User } from '../../entities/user';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store/store';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersActions } from '../../redux/users.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-player',
  templateUrl: './list-player.component.html',
  styleUrls: ['./list-player.component.scss']
})
export class ListPlayerComponent implements OnInit {
  listPlayerForm:FormGroup;
  user:User;
  subscription;
  constructor(private ngRedux:NgRedux<IAppState>, private fb: FormBuilder, private usersActions:UsersActions, private router:Router ) { 
    
  }

  ngOnInit() {
    this.subscription = this.ngRedux.select(state => state.users).subscribe(data => {
      if(data.user != undefined){
        this.user = data.user;
        console.log('CREATING FORM');
        this.createForm();
      }
    });
  }

  createForm() {
    this.listPlayerForm = this.fb.group({
       firstname: [this.user.firstname, Validators.required],
       lastname: [this.user.lastname, Validators.required],
       username: [this.user.username, Validators.required],
       email: [this.user.email, [Validators.required, Validators.email]],
       dateofbirth: [this.user.dateofbirth, Validators.required],
       playerrole: [this.user.playerrole],
       description: [this.user.description],
    });
  }
  listPlayerFormSubmit(listPlayerForm:FormGroup, event:Event){
    console.log('submit', listPlayerForm, listPlayerForm.invalid)
    console.log(JSON.stringify(listPlayerForm.value));
    let user:User = listPlayerForm.value as User; 
    this.usersActions.listUser(user);
    this.router.navigate(['/app/players/']);
  }

}
