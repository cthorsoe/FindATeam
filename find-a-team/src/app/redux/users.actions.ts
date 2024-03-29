import {Injectable} from '@angular/core';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../store/store';
import {Player} from '../entities/player';
import {User} from '../entities/user';
import {Invite} from '../entities/invite';

@Injectable()
export class UsersActions {

    constructor(private ngRedux: NgRedux < IAppState > ) {
    }

    // Available actions
    static LOGIN: string = 'LOGIN';
    static SUCCESS_LOGIN: string = 'SUCCESS_LOGIN';
    static FAILED_LOGIN: string = 'FAILED_LOGIN';

    static LOGOUT: string = 'LOGOUT';
    static SUCCESS_LOGOUT: string = 'SUCCESS_LOGOUT';
    static FAILED_LOGOUT: string = 'FAILED_LOGOUT';

    static LOGIN_BY_SESSION: string = 'LOGIN_BY_SESSION';
    static SUCCESS_LOGIN_BY_SESSION: string = 'SUCCESS_LOGIN_BY_SESSION';
    static FAILED_LOGIN_BY_SESSION: string = 'FAILED_LOGIN_BY_SESSION';

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

    static LIST_USER: string = 'LIST_USER';
    static SUCCESS_LIST_USER: string = 'SUCCESS_LIST_USER';
    static FAILED_LIST_USER: string = 'FAILED_LIST_USER';

    /* static ACCEPT_INVITE: string = 'ACCEPT_INVITE';
    static SUCCESS_ACCEPT_INVITE: string = 'SUCCESS_ACCEPT_INVITE';
    static FAILED_ACCEPT_INVITE: string = 'FAILED_ACCEPT_INVITE';

    static GET_TEAM_INVITES: string = 'GET_TEAM_INVITES';
    static SUCCESS_GET_TEAM_INVITES: string = 'SUCCESS_GET_TEAM_INVITES';
    static FAILED_GET_TEAM_INVITES: string = 'FAILED_GET_TEAM_INVITES';
    
    static ADD_INVITE: string = 'ADD_INVITE'; */
    static ADD_USER_TO_TEAM: string = 'ADD_USER_TO_TEAM';

  getSpecificUser(username: String) {
    this.ngRedux.dispatch({
      type: UsersActions.GET_SPECIFIC_USER,
      payload: username
    });
  }

  getUsers() {
    this.ngRedux.dispatch({
      type: UsersActions.GET_USERS
    });
  }

  deleteUser(username: String) {
    this.ngRedux.dispatch({
      type: UsersActions.DELETE_USER,
      payload: username
    });
  }

  createUser(user: Player): void {
    // console.log('creating user');
    this.ngRedux.dispatch({
      type: UsersActions.CREATE_USER,
      payload: user
    });
  }

  updateUser(user: User): void {
    // console.log('updating user');
    this.ngRedux.dispatch({
      type: UsersActions.EDIT_USER,
      payload: user
    });
  }

  userLogin(user): void { // {username, password}
    // console.log('creating user');
    this.ngRedux.dispatch({
      type: UsersActions.LOGIN,
      payload: user
    });
  }

  loginBySession(sessionSalt, sessionId): void{
    // console.log('creating user');
    this.ngRedux.dispatch({
      type: UsersActions.LOGIN_BY_SESSION,
      payload: {
        sessionSalt: sessionSalt,
        sessionId: sessionId
      }
    });
  }
  userLogout(sessionId): void { // {username, password}
    // console.log('creating user');
    this.ngRedux.dispatch({
      type: UsersActions.LOGOUT,
      payload: sessionId
    });
  }

  listUser(user: User): void {
    this.ngRedux.dispatch({
      type: UsersActions.LIST_USER,
      payload: user
    });
  }
    addUserToTeam(invite): void {
        this.ngRedux.dispatch({
            type: UsersActions.ADD_USER_TO_TEAM,
            payload: invite
        });
    }
  /* getTeamInvites(username: String) {
    this.ngRedux.dispatch({
      type: UsersActions.GET_TEAM_INVITES,
      payload: username
    });
  }
  acceptInvite(invite: any): void {
    this.ngRedux.dispatch({
        type: UsersActions.ACCEPT_INVITE,
        payload: invite
    });
  }
  addInvite(invite:Invite){
    this.ngRedux.dispatch({
        type: UsersActions.ADD_INVITE,
        payload: invite
    });
  } */
}
