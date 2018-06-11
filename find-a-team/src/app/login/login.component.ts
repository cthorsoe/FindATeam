import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersActions } from '../redux/users.actions';
import { Player } from '../entities/player';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TeamsActions } from '../redux/teams.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private usersActions:UsersActions, private teamsActions:TeamsActions, private router:Router, private authService:AuthService){
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
    if(loginForm.valid){
      this.usersActions.userLogin(loginForm.value);
      console.log('valid');
   }else{
      console.log('invalid');

   }
  }


}
