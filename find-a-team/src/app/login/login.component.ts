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
      this.usersActions.userLogin(loginForm.value); // HVORDAN KAN JEG VIDE AT DEN HER ER FÆRDIG MED ALT DEN SKAL GØRE?
      // IF LOGIN WAS SUCCESS...
      this.teamsActions.getMyTeams(loginForm.value.username);
      this.authService.login();
      // END IF.
      
      // FØLGENDE KODE SKULLE KØRES NÅR SUCCESS_LOGIN ER KØRT I REDUCEREN.
      // if(this.authService.redirectUrl != undefined && this.authService.redirectUrl != "/portal/logout"){
      //   this.router.navigate([this.authService.redirectUrl]);
      // }else{
      //     // this.router.navigate(['portal']);
      // }
      
      this.router.navigate(['app/home']);
      console.log('valid');
   }else{
      console.log('invalid');

   }
  }


}
