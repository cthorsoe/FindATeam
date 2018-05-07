import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersActions } from '../redux/users.actions';
import { Player } from '../entities/player';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private usersActions:UsersActions, private router:Router){
    this.createForm();
  }

  ngOnInit() {

  }

  createForm() {
    this.loginForm = this.fb.group({
       username: ['', Validators.required],
       password: ['', Validators.required],
    });
  }
  loginFormSubmit(loginForm:FormGroup, event:Event){
    console.log('submit', loginForm, loginForm.invalid)
    // let user:Player = registerUserForm.value as Player; 
    this.usersActions.userLogin(loginForm.value);
    this.router.navigate(['app/home']);
  }


}
