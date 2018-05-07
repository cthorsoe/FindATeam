import { OnInit, Injectable } from "@angular/core";
import { ActionsObservable } from "redux-observable";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs/Observable";
import { UsersService } from "./users.service";
import { UsersActions } from "./users.actions";

@Injectable()
export class UsersEpic implements OnInit {
   constructor (private usersService: UsersService){
      
   }
   ngOnInit(): void {
   }

   getUsers = (action$: ActionsObservable<any>) => {
    //  console.log('EPIC WAS HIT');
      return action$.ofType(UsersActions.GET_USERS) // Listen for this action
        .mergeMap(({payload}) => { // payload: (subject: Subject, date: Date): When this action is activated, call ws through service class or directly like below
            return this.usersService.getUsers()
              .map((result:any[]) => ({ // when web service responds with success, call this action with payload that came back from webservice
                type: UsersActions.SUCCESS_GET_USERS,
                payload: result
              })
            )
              .catch(error => Observable.of({ // when web service responds with failure, call this action with payload that came back from webservice
                type: UsersActions.FAILED_GET_USERS,
                payload: error
            }));
      });
   }

   userLogin = (action$: ActionsObservable<any>) => {
    //  console.log('EPIC WAS HIT');
      return action$.ofType(UsersActions.LOGIN) // Listen for this action
        .mergeMap(({payload}) => { // payload: (subject: Subject, date: Date): When this action is activated, call ws through service class or directly like below
            return this.usersService.getUsers()
              .map((result:Object) => ({ // when web service responds with success, call this action with payload that came back from webservice
                type: UsersActions.SUCCESS_LOGIN,
                payload: result
              }))
              .catch(error => Observable.of({ // when web service responds with failure, call this action with payload that came back from webservice
                type: UsersActions.FAILED_LOGIN,
                payload: error
            }));
      });
   }

   createUser = (action$: ActionsObservable<any>) => {
    // console.log('EPIC WAS HIT');
      return action$.ofType(UsersActions.CREATE_USER) // Listen for this action
        .mergeMap(({payload: user}) => { // baby: (subject: Subject, date: Date): When this action is activated, call ws through service class or directly like below
            return this.usersService.createUser(user)
              .map((result:String) => ({ // when web service responds with success, call this action with payload that came back from webservice
                type: UsersActions.SUCCESS_CREATE_USER,
                payload: user
              }))
              .catch(error => Observable.of({ // when web service responds with failure, call this action with payload that came back from webservice
                type: UsersActions.FAILED_CREATE_USER,
                payload: error
            }));
      });
   }

   deleteUser = (action$: ActionsObservable<any>) => {
      return action$.ofType(UsersActions.DELETE_USER) // Listen for this action
        .mergeMap(({payload}) => { // payload: (subject: Subject, date: Date): When this action is activated, call ws through service class or directly like below
         console.log('PAYLOAD', payload);
            return this.usersService.deleteUser(payload)
              .map((result:String) => ({ // when web service responds with success, call this action with payload that came back from webservice
                type: UsersActions.SUCCESS_DELETE_USER,
                payload: payload
              }))
              .catch(error => Observable.of({ // when web service responds with failure, call this action with payload that came back from webservice
                type: UsersActions.FAILED_DELETE_USER,
                payload: error
            }));
      });
   }

   editUser = (action$: ActionsObservable<any>) => {
      return action$.ofType(UsersActions.EDIT_USER) // Listen for this action
        .mergeMap(({payload}) => { // payload: (subject: Subject, date: Date): When this action is activated, call ws through service class or directly like below
         console.log('PAYLOAD', payload);
            return this.usersService.editUser(payload)
              .map((result:String) => ({ // when web service responds with success, call this action with payload that came back from webservice
                type: UsersActions.SUCCESS_EDIT_USER,
                payload: payload
              }))
              .catch(error => Observable.of({ // when web service responds with failure, call this action with payload that came back from webservice
                type: UsersActions.FAILED_EDIT_USER,
                payload: error
            }));
      });
   }
}


