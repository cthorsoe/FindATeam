import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store/store';
import { Player } from '../entities/player';

@Injectable()
export class UsersActions {
 
  constructor (
   private ngRedux: NgRedux<IAppState>) {}
   
   // Available actions
   static LOGIN: string = 'LOGIN';
   static SUCCESS_LOGIN: string = 'SUCCESS_LOGIN';
   static FAILED_LOGIN: string = 'FAILED_LOGIN';
   static LOGOUT: string = 'LOGOUT';

   static GET_SPECIFIC_USER: string = 'GET_SPECIFIC_USER';
   static SUCCESS_GET_SPECIFIC_USER: string = 'SUCCESS_GET_SPECIFIC_USER';
   static FAILED_GET_SPECIFIC_USER: string = 'FAILED_GET_SPECIFIC_USER';

   static GET_USERS: string = 'GET_USERS';
   static SUCCESS_GET_USERS: string = 'SUCCESS_GET_USERS';
   static FAILED_GET_USERS: string = 'FAILED_GET_USERS';
   
   static DELETE_USER: string = 'DELETE_USER';
   static SUCCESS_DELETE_USER: string = 'SUCCESS_DELETE_USER';
   static FAILED_DELETE_USER: string = 'FAILED_DELETE_USER';

   static EDIT_USER: string = 'EDIT_USER';
   static SUCCESS_EDIT_USER: string = 'SUCCESS_EDIT_USER';
   static FAILED_EDIT_USER: string = 'FAILED_EDIT_USER';

   static CREATE_USER: string = 'CREATE_USER';
   static SUCCESS_CREATE_USER: string = 'SUCCESS_CREATE_USER';
   static FAILED_CREATE_USER: string = 'FAILED_CREATE_USER';

  getSpecificUser(username:String){
    this.ngRedux.dispatch({
        type:UsersActions.GET_SPECIFIC_USER,
        payload: username
    });
  }

  getUsers(){
    this.ngRedux.dispatch({
        type:UsersActions.GET_USERS
    });
  }

  deleteUser(username:String){
    this.ngRedux.dispatch({
        type:UsersActions.DELETE_USER,
        payload: username
    });
  }

  createUser(user: Player): void{
    // console.log('creating user');
    this.ngRedux.dispatch({
        type: UsersActions.CREATE_USER,
        payload: user
    });
  }

  updateUser(user: Player): void{
    // console.log('updating user');
    this.ngRedux.dispatch({
        type: UsersActions.EDIT_USER,
        payload: user
    });
  }

  userLogin(user): void{ // {username, password}
    // console.log('creating user');
    this.ngRedux.dispatch({
       type: UsersActions.LOGIN,
       payload: user
    });
  }
  userLogout(): void{ // {username, password}
    // console.log('creating user');
    this.ngRedux.dispatch({
       type: UsersActions.LOGOUT
    });
  }
}
