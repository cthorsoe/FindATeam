import { UsersActions } from './users.actions';
import { UsersState } from '../store/store';
import { tassign } from 'tassign';
import { UsersService } from './users.service';
import { User } from '../entities/user';
import { TeamsActions } from './teams.actions';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

const INITIAL_STATE: UsersState = UsersService.getInitialUsersState();

export function usersReducer(state: UsersState = INITIAL_STATE, action:any) {
  let newUsersArray;
  let index;
  let newState;
  let newTeam;
  switch (action.type) {
    /* ------------------------------------ USER LOGIN BEGIN ------------------------------------ */
    case UsersActions.LOGIN: // action.payload: empty
      return state;

    case UsersActions.SUCCESS_LOGIN: // action.payload: Player
        console.log('PAYLOAD', action.payload);
        localStorage.tuLoginSession = action.payload.session;
        localStorage.tuLoginSessionId = action.payload.sessionId;
        if(action.payload.role == "admin"){
            action.payload.isAdmin = true;
        }
        // newState.loggedIn = true;
        return tassign(state, {user: action.payload, loggedIn: {loggedIn: true, loggedInWithForm: true, userRole: action.payload.role}})
      // return state;

    case UsersActions.FAILED_LOGIN: // action.payload: empty
      return state;
    /* ------------------------------------ USER LOGIN END ------------------------------------ */

    /* ------------------------------------ USER LOGOUT BEGIN ------------------------------------ */
    case UsersActions.LOGOUT: // action.payload: empty
      return state

    case UsersActions.SUCCESS_LOGOUT: // action.payload: Player[]
      console.log('PAYLOAD', action.payload);
      delete localStorage.tuLoginSession;
      delete localStorage.tuLoginSessionId;
      // delete action.payload.session;
      return tassign(state, {user: undefined, loggedIn: {loggedIn: false, loggedInWithForm: false}})
      // return state;

    case UsersActions.FAILED_LOGOUT: // action.payload: empty
      return state;
      /* ------------------------------------ USER LOGOUT END ------------------------------------ */
      
    /* ------------------------------------ LOGIN BY SESSION BEGIN ------------------------------------ */
    case UsersActions.LOGIN_BY_SESSION: // action.payload: empty
        console.log('LOGIN_BY_SESSION', action.payload)
        return state;

    case UsersActions.SUCCESS_LOGIN_BY_SESSION: // action.payload: Player[]
        console.log('PAYLOAD', action.payload);
        if(action.payload.role == "admin"){
            action.payload.isAdmin = true;
        }
        return tassign(state, {user: action.payload, loggedIn: {loggedIn: true, loggedInWithForm: false, userRole: action.payload.role}})
        // return state;
      
      case UsersActions.FAILED_LOGIN_BY_SESSION: // action.payload: empty
      return tassign(state, {failedAutoLogin: true})
    //   return state;
    /* ------------------------------------ LOGIN BY SESSION END ------------------------------------ */

    /* ------------------------------------ GET SPECIFIC USER BEGIN ------------------------------------ */
    case UsersActions.GET_SPECIFIC_USER: // action.payload: empty
      return state;

    case UsersActions.SUCCESS_GET_SPECIFIC_USER: // action.payload: User
      console.log('PAYLOAD', action.payload);
      return tassign(state, {selectedUser: action.payload})

    case UsersActions.FAILED_GET_SPECIFIC_USER: // action.payload: empty
      return state;
    /* ------------------------------------ GET SPECIFIC USER END ------------------------------------ */

    /* ------------------------------------ GET USERS BEGIN ------------------------------------ */
    case UsersActions.GET_USERS: // action.payload: empty
      return state;

    case UsersActions.SUCCESS_GET_USERS: // action.payload: Player[]
      console.log('PAYLOAD', action.payload);
      return tassign(state, {listedUsers: action.payload})

    case UsersActions.FAILED_GET_USERS: // action.payload: empty
      return state;
    /* ------------------------------------ GET USERS END ------------------------------------ */

    /* ------------------------------------ CREATE USER BEGIN ------------------------------------ */
    case UsersActions.CREATE_USER: // action.payload: empty
    return state;
    
    case UsersActions.SUCCESS_CREATE_USER: // action.payload: Player
      console.log('PAYLOAD', action.payload);
      return state;
      // return tassign(state, {listedUsers: [...state.listedUsers, action.payload]})
    
    case UsersActions.FAILED_CREATE_USER: // action.payload: empty
      return state;
    /* ------------------------------------ CREATE USER END ------------------------------------ */

    /* ------------------------------------ DELETE USER BEGIN ------------------------------------ */
    case UsersActions.DELETE_USER: // action.payload: empty
      return state;

    case UsersActions.SUCCESS_DELETE_USER: // action.payload: username:String
      console.log('PAYLOAD', action.payload);
      newUsersArray = [... state.listedUsers];
      index = newUsersArray.findIndex(x => x.username == action.payload);
      if(index > -1){
        newUsersArray.splice(index, 1);
        return tassign(state, {listedUsers: newUsersArray})
      }
      return state;
    case UsersActions.FAILED_DELETE_USER: // action.payload: empty
      return state;
    /* ------------------------------------ DELETE USER END ------------------------------------ */

    /* ------------------------------------ EDIT USER BEGIN ------------------------------------ */
    case UsersActions.EDIT_USER: // action.payload: empty
      return state;
    
    case UsersActions.SUCCESS_EDIT_USER: // action.payload: User
      newState = {user: action.payload};
      index = state.listedUsers.findIndex(x => x.username == action.payload.username);
      console.log('INDEX', index);
      if(index > -1){
        newUsersArray = [...state.listedUsers];
        newUsersArray[index] = action.payload;
        newState.listedUsers = newUsersArray;
      }
      if(state.selectedUser.username == action.payload.username){
        newState.selectedUser = action.payload;
      }

      return tassign(state, newState)

      // index = newUsersArray.findIndex(x => x.username == action.payload.username);
      // if(index > -1){
      //   newUsersArray[index] = action.payload
      // }
      // return state;
    
    case UsersActions.FAILED_EDIT_USER: // action.payload: empty
      return state;
    
    /* ------------------------------------ EDIT USER END ------------------------------------ */

    /* ------------------------------------ CREATE USER BEGIN ------------------------------------ */
    case UsersActions.LIST_USER: // action.payload: empty
    return state;
    
    case UsersActions.SUCCESS_LIST_USER: // action.payload: User
      console.log('PAYLOAD', action.payload);
      index = state.listedUsers.findIndex(x => x.username == action.payload.username);
      if(index == -1){
        return tassign(state, {listedUsers: [...state.listedUsers, action.payload]})
      }
      return state;
    
    case UsersActions.FAILED_LIST_USER: // action.payload: empty
      return state;
    /* ------------------------------------ CREATE USER END ------------------------------------ */

     /* ------------------------------------ GET TEAM INVITES BEGIN ------------------------------------ */
    /* case UsersActions.GET_TEAM_INVITES: // action.payload: empty
    console.log('GET_TEAM_INVITES payload', action.payload)
    return state;

    case UsersActions.SUCCESS_GET_TEAM_INVITES: // action.payload: Player[]
    console.log('SUCCESS_GET_TEAM_INVITES payload', action.payload)
      console.log(action.payload);
      return tassign(state, {teamInvites: action.payload})
    //   return state

    case UsersActions.FAILED_GET_TEAM_INVITES: // action.payload: empty
      return state; */
    /* ------------------------------------ GET TEAM INVITES END ------------------------------------ */


    /* ------------------------------------ ACCEPT INVITE BEGIN ------------------------------------ */
    /* case UsersActions.ACCEPT_INVITE: // action.payload: empty
        return state
    case UsersActions.SUCCESS_ACCEPT_INVITE: // action.payload: {teamId, userId}
        newState = {};
        newState.teamInvites = [...state.teamInvites];
        index = newState.teamInvites.findIndex(x => x.id == action.payload.teamId);
        console.log('INDEX', index)
        if(index > -1){
            newTeam = newState.teamInvites[index];
            newTeam.members = [...newTeam.members, state.user]
            newState.teamInvites.splice(index, 1);
        }

        return tassign(state, newState)
    case UsersActions.FAILED_ACCEPT_INVITE: // action.payload: empty
        return state */
    /* ------------------------------------ ACCEPT INVITE END ------------------------------------ */

    /* ------------------------------------ ADD INVITE BEGIN ------------------------------------ */
    /* case UsersActions.ADD_INVITE: // action.payload: empty
        console.log('ADD INVITE', action.payload)
        return tassign(state, {teamInvites: [...state.teamInvites, action.payload.team]})
        // return state; */
    /* ------------------------------------ ADD INVITE END ------------------------------------ */

    default:
      return state;
 }
}
