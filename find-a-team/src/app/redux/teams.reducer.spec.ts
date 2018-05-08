var deepFreeze = require('deep-freeze');
import { usersReducer } from './users.reducer';
import * as types from './users.actions';
import { UsersService } from './users.service';

describe('register reducer', () => {

  //  it('should return the initial state', () => {
  //     expect(usersReducer(undefined, {})).toEqual(UsersService.getInitialUsersState());
  //  });

  //  it('Toggle isBaby or sitter', () => {
  //     let state =  UsersService.getInitialUsersState();
  //     deepFreeze(state);
  //     let afterState = UsersService.getInitialUsersState();
  //     afterState.isBaby = true;


  //     expect(
  //        usersReducer(state, {
  //        type: types.UsersActions.SET_TYPE,
  //        payload: true 
  //        })).toEqual(afterState);
  //  });

  //  it('Should add a new baby object to the babies array', () => {
  //     let initialState =  UsersService.getInitialUsersState();
  //     deepFreeze(initialState);
  //     let afterState = UsersService.getInitialUsersState();

  //     let baby = { 
  //        firstname: 'Peter', 
  //        lastname: 'Petursson', 
  //        username: 'test baby 1', 
  //        dateofbirth: new Date(2018,0, 1), 
  //        rating: [],
  //        area: 'Copenhagen', 
  //        shortDescription: 'Short Description',
  //        fullDescription: 'Full Description',
  //        gender:'Male',
  //        avatar:'imgurl'
  //     };
  //     afterState.babies.push(baby);

  //     let newState = usersReducer(initialState, {
  //        type: types.UsersActions.CREATE_BABY,
  //        payload: baby
  //     });
  //     expect(newState.babies.length).toEqual(1);
  //     expect(newState).toEqual(afterState);
  //  });
});