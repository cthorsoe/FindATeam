import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UsersEpic } from '../redux/users.epic';
import { UsersActions } from '../redux/users.actions';
import { Player } from '../entities/player';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    registerUserForm: FormGroup;
    constructor(private fb: FormBuilder, private usersActions:UsersActions, private router:Router){
        this.createForm();
    }
    
    createForm() {
      this.registerUserForm = this.fb.group({
          firstname: ['', Validators.required],
          lastname: ['', Validators.required],
          username: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          dateofbirth: ['', Validators.required],
          password: ['', Validators.required],
          passwordConfirm: ['', Validators.required],
        });
    }

    ngOnInit() {

    }
  registerUserFormSubmit(registerUserForm:FormGroup, event:Event){
    console.log('submit', registerUserForm, registerUserForm.invalid)
    console.log(JSON.stringify(registerUserForm.value));
    let user:Player = registerUserForm.value as Player; 
    this.usersActions.createUser(user);
    this.router.navigate(['/app/login/']);
  }

}
