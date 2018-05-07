import { UsersActions } from './users.actions';
import { UsersState } from '../store/store';
import { tassign } from 'tassign';
import { UsersService } from './users.service';

const INITIAL_STATE: UsersState = UsersService.getInitialUsersState();

export function usersReducer(state: UsersState = INITIAL_STATE, action:any) {
  let newUsersArray;
  let index;
  switch (action.type) {
    /* ------------------------------------ USER LOGIN BEGIN ------------------------------------ */
    case UsersActions.LOGIN: // action.payload: empty
      return state;

    case UsersActions.SUCCESS_LOGIN: // action.payload: Player[]
      console.log('PAYLOAD', action.payload);
      if(action.payload.length == 1 ){
        return tassign(state, {user: action.payload})
      }
      return state;

    case UsersActions.FAILED_LOGIN: // action.payload: empty
      return state;
    case UsersActions.LOGOUT: // action.payload: empty
      return tassign(state, {user: undefined})
    /* ------------------------------------ USER LOGIN END ------------------------------------ */

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
    
    case UsersActions.SUCCESS_EDIT_USER: // action.payload: Player
      console.log('PAYLOAD', action.payload);
      newUsersArray = [... state.listedUsers];
      index = newUsersArray.findIndex(x => x.username == action.payload.username);
      if(index > -1){
        newUsersArray[index] = action.payload
        return tassign(state, {listedUsers: newUsersArray})
      }
      return state;
    
    case UsersActions.FAILED_EDIT_USER: // action.payload: empty
      return state;
    
    /* ------------------------------------ EDIT USER END ------------------------------------ */
    default:
      return state;
 }
}
