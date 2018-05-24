import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersActions } from '../../redux/users.actions';
import { Router } from '@angular/router';
import { User } from '../../entities/user';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store/store';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit, OnDestroy {
  editUserForm: FormGroup;
  user:User;
  subscription;
  constructor(private ngRedux:NgRedux<IAppState>, private fb: FormBuilder, private usersActions:UsersActions, private router:Router) { 
    
  }

  ngOnInit() {
    this.subscription = this.ngRedux.select(state => state.users.user).subscribe(user => {
      this.user = user;
      console.log('USER', this.user);
      this.createForm(this.user);
    });
  }
  createForm(user) {
    this.editUserForm = this.fb.group({
       firstname: [user.firstname, Validators.required],
       lastname: [user.lastname, Validators.required],
       username: [user.username, Validators.required],
       email: [user.email, [Validators.required, Validators.email]],
       dateofbirth: [user.dateofbirth, Validators.required],
       playerrole: [user.playerrole],
       phone: [user.phone],
       description: [user.description],
    });
  }
  ngOnDestroy(){

  }
  editUserFormSubmit(editUserForm:FormGroup, event:Event){
    console.log('submit', editUserForm, editUserForm.invalid)
    console.log(JSON.stringify(editUserForm.value));
    this.user = editUserForm.value as User;
    this.usersActions.updateUser(this.user);
    this.router.navigate(['/app/profile/' + this.user.username]); // ON RESPONSE so data will be updated
  }

}
