var deepFreeze = require('deep-freeze');
import { usersReducer } from './users.reducer';
import * as types from './users.actions';
import { UsersService } from './users.service';
import { User } from '../entities/user';

describe('Register reducer', () => {
    it('Should return the initial state', () => {
        expect(usersReducer(undefined, {})).toEqual(UsersService.getInitialUsersState());
    });
});

describe('Get Listed Users', () => {
    let initialState =  UsersService.getInitialUsersState();
    deepFreeze(initialState);
    let afterState = UsersService.getInitialUsersState();
    let dummyPlayer = {
        id:1,
        firstname:'John',
        lastname:'Doe',
        username:'john_doe',
        dateofbirth: new Date(2000, 0, 1),
        email:'john@doe.dk'
    }
    it('Should add dummy user to listedUser array with the SUCCESS_GET_USER action', () => {
        afterState.listedUsers.push(dummyPlayer)
        let newState = usersReducer(initialState, {
            type: types.UsersActions.SUCCESS_GET_USERS,
            payload: [
                dummyPlayer
            ]
        });

        expect(newState.listedUsers.length).toEqual(1);
        expect(newState).toEqual(afterState);
    });
});

describe('Login and Logout', () => {
    let initialState =  UsersService.getInitialUsersState();
    deepFreeze(initialState);
    let afterState = UsersService.getInitialUsersState();
    let dummyUser = {
        id:1,
        firstname:'John',
        lastname:'Doe',
        username:'john_doe',
        dateofbirth: new Date(2000, 0, 1),
        email:'john@doe.dk',
        teams: [],
        role:'User',
        isAdmin:false
    }
    it('Should add user to user object, opon loggin in.', () => {
        afterState.user = dummyUser
        afterState.loggedIn = {loggedIn:true, loggedInWithForm:true, userRole:'User'}
        let newState = usersReducer(initialState, {
            type: types.UsersActions.SUCCESS_LOGIN,
            payload: dummyUser
        });

        expect(newState.user).toBeDefined();
        expect(newState).toEqual(afterState);
    });

    it('Should remove user from user object, opon loggin out.', () => {
        afterState.user = undefined
        afterState.loggedIn = {loggedIn:false, loggedInWithForm:false}
        let newState = usersReducer(initialState, {
            type: types.UsersActions.SUCCESS_LOGOUT
        });

        expect(newState.user).toBeUndefined();
        expect(newState).toEqual(afterState);
    });
});

describe('List yourself and unlist afterwards', () => {
    let initialState =  UsersService.getInitialUsersState();
    deepFreeze(initialState);
    let afterState = UsersService.getInitialUsersState();
    let dummyPlayer = {
        id:1,
        firstname:'John',
        lastname:'Doe',
        username:'john_doe',
        dateofbirth: new Date(2000, 0, 1),
        email:'john@doe.dk'
    }
    it('Should add dummy user to listedUser array with the SUCCESS_LIST_USER action', () => {
        afterState.listedUsers.push(dummyPlayer)
        let newState = usersReducer(initialState, {
            type: types.UsersActions.SUCCESS_LIST_USER,
            payload: dummyPlayer
        });

        expect(newState.listedUsers.length).toEqual(1);
        expect(newState).toEqual(afterState);
    });

    it('Should remove the added user from listedUser array with the SUCCES_DELETE_USER action', ()=> {
        afterState.listedUsers = afterState.listedUsers.splice(1, 1);
        let newState = usersReducer(initialState, {
            type: types.UsersActions.SUCCESS_DELETE_USER,
            payload: dummyPlayer.username
        });

        expect(newState.listedUsers.length).toEqual(0);
        expect(newState).toEqual(afterState);
    });
});





/* 
describe('DEEP FREEZE TEST', () => {
    let initialState =  UsersService.getInitialUsersState();
    deepFreeze(initialState);
    it('Deepfreezed item should not be changable', () => {
        initialState.loggedIn = {value:'this value has been changed'};
        expect(initialState.loggedIn).toEqual({value:'this value has been changed'})
    });
});
 */