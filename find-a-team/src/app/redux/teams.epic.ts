import { OnInit, Injectable } from "@angular/core";
import { ActionsObservable } from "redux-observable";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs/Observable";
import { TeamsService } from "./teams.service";
import { TeamsActions } from "./teams.actions";

@Injectable()
export class TeamsEpic implements OnInit {
   constructor (private teamsService: TeamsService){
      
   }
   ngOnInit(): void {
   }

   getSpecificTeam = (action$: ActionsObservable<any>) => {
      return action$.ofType(TeamsActions.GET_SPECIFIC_TEAM) // Listen for this action
        .mergeMap(({payload}) => { // payload: (subject: Subject, date: Date): When this action is activated, call ws through service class or directly like below
            return this.teamsService.getTeam(payload)
              .map((result:any) => ({ // when web service responds with success, call this action with payload that came back from webservice
                type: TeamsActions.SUCCESS_GET_SPECIFIC_TEAM,
                payload: result
              })
            )
              .catch(error => Observable.of({ // when web service responds with failure, call this action with payload that came back from webservice
                type: TeamsActions.FAILED_GET_SPECIFIC_TEAM,
                payload: error
            }));
      });
   }

   getTeams = (action$: ActionsObservable<any>) => {
      return action$.ofType(TeamsActions.GET_TEAMS) // Listen for this action
        .mergeMap(({payload}) => { // payload: (subject: Subject, date: Date): When this action is activated, call ws through service class or directly like below
            return this.teamsService.getTeams()
              .map((result:any[]) => ({ // when web service responds with success, call this action with payload that came back from webservice
                type: TeamsActions.SUCCESS_GET_TEAMS,
                payload: result
              })
            )
              .catch(error => Observable.of({ // when web service responds with failure, call this action with payload that came back from webservice
                type: TeamsActions.SUCCESS_GET_TEAMS,
                payload: error
            }));
      });
   }

   getMyTeams = (action$: ActionsObservable<any>) => {
    return action$.ofType(TeamsActions.GET_MY_TEAMS) // Listen for this action
      .mergeMap(({payload}) => { // payload: (subject: Subject, date: Date): When this action is activated, call ws through service class or directly like below
          return this.teamsService.getMyTeams(payload)
            .map((result:any[]) => ({ // when web service responds with success, call this action with payload that came back from webservice
              type: TeamsActions.SUCCESS_GET_MY_TEAMS,
              payload: result
            })
          )
            .catch(error => Observable.of({ // when web service responds with failure, call this action with payload that came back from webservice
              type: TeamsActions.SUCCESS_GET_MY_TEAMS,
              payload: error
          }));
    });
 }

   createTeam = (action$: ActionsObservable<any>) => {
      return action$.ofType(TeamsActions.CREATE_TEAM) // Listen for this action
        .mergeMap(({payload: user}) => { // baby: (subject: Subject, date: Date): When this action is activated, call ws through service class or directly like below
            return this.teamsService.createTeam(user)
              .map((result:String) => ({ // when web service responds with success, call this action with payload that came back from webservice
                type: TeamsActions.SUCCESS_CREATE_TEAM,
                payload: user
              }))
              .catch(error => Observable.of({ // when web service responds with failure, call this action with payload that came back from webservice
                type: TeamsActions.FAILED_CREATE_TEAM,
                payload: error
            }));
      });
   }

   deleteTeam = (action$: ActionsObservable<any>) => {
      return action$.ofType(TeamsActions.DELETE_TEAM) // Listen for this action
        .mergeMap(({payload}) => { // payload: (subject: Subject, date: Date): When this action is activated, call ws through service class or directly like below
         console.log('PAYLOAD', payload);
            return this.teamsService.deleteTeam(payload)
              .map((result:String) => ({ // when web service responds with success, call this action with payload that came back from webservice
                type: TeamsActions.SUCCESS_DELETE_TEAM,
                payload: payload
              }))
              .catch(error => Observable.of({ // when web service responds with failure, call this action with payload that came back from webservice
                type: TeamsActions.FAILED_DELETE_TEAM,
                payload: error
            }));
      });
   }

   editTeam = (action$: ActionsObservable<any>) => {
      return action$.ofType(TeamsActions.EDIT_TEAM) // Listen for this action
        .mergeMap(({payload}) => { // payload: (subject: Subject, date: Date): When this action is activated, call ws through service class or directly like below
         console.log('PAYLOAD', payload);
            return this.teamsService.editTeam(payload)
              .map((result:String) => ({ // when web service responds with success, call this action with payload that came back from webservice
                type: TeamsActions.SUCCESS_EDIT_TEAM,
                payload: payload
              }))
              .catch(error => Observable.of({ // when web service responds with failure, call this action with payload that came back from webservice
                type: TeamsActions.FAILED_EDIT_TEAM,
                payload: error
            }));
      });
   }

   listTeam = (action$: ActionsObservable<any>) => {
    return action$.ofType(TeamsActions.LIST_TEAM) // Listen for this action
      .mergeMap(({payload: user}) => { // baby: (subject: Subject, date: Date): When this action is activated, call ws through service class or directly like below
          return this.teamsService.listTeam(user.id)
            .map((result:String) => ({ // when web service responds with success, call this action with payload that came back from webservice
              type: TeamsActions.SUCCESS_LIST_TEAM,
              payload: user
            }))
            .catch(error => Observable.of({ // when web service responds with failure, call this action with payload that came back from webservice
              type: TeamsActions.FAILED_LIST_TEAM,
              payload: error
          }));
    });
 }
}


