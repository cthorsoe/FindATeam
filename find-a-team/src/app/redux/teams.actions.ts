import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store/store';
import { Player } from '../entities/player';
import { Team } from '../entities/team';

@Injectable()
export class TeamsActions {
 
  constructor (
   private ngRedux: NgRedux<IAppState>) {}
   
   // Available actions
   static GET_SPECIFIC_TEAM: string = 'GET_SPECIFIC_TEAM';
   static SUCCESS_GET_SPECIFIC_TEAM: string = 'SUCCESS_GET_SPECIFIC_TEAM';
   static FAILED_GET_SPECIFIC_TEAM: string = 'FAILED_GET_SPECIFIC_TEAM';

   static GET_TEAMS: string = 'GET_TEAMS';
   static SUCCESS_GET_TEAMS: string = 'SUCCESS_GET_TEAMS';
   static FAILED_GET_TEAMS: string = 'FAILED_GET_TEAMS';
   
   static DELETE_TEAM: string = 'DELETE_TEAM';
   static SUCCESS_DELETE_TEAM: string = 'SUCCESS_DELETE_TEAM';
   static FAILED_DELETE_TEAM: string = 'FAILED_DELETE_TEAM';

   static EDIT_TEAM: string = 'EDIT_TEAM';
   static SUCCESS_EDIT_TEAM: string = 'SUCCESS_EDIT_TEAM';
   static FAILED_EDIT_TEAM: string = 'FAILED_EDIT_TEAM';

   static CREATE_TEAM: string = 'CREATE_TEAM';
   static SUCCESS_CREATE_TEAM: string = 'SUCCESS_CREATE_TEAM';
   static FAILED_CREATE_TEAM: string = 'FAILED_CREATE_TEAM';
   
   static LIST_TEAM: string = 'LIST_TEAM';
   static SUCCESS_LIST_TEAM: string = 'SUCCESS_LIST_TEAM';
   static FAILED_LIST_TEAM: string = 'FAILED_LIST_TEAM';

  getSpecificTeam(name:String){
    this.ngRedux.dispatch({
        type:TeamsActions.GET_SPECIFIC_TEAM,
        payload: name
    });
  }

  getTeams(){
    this.ngRedux.dispatch({
        type:TeamsActions.GET_TEAMS
    });
  }

  deleteTeam(name:String){
    this.ngRedux.dispatch({
        type:TeamsActions.DELETE_TEAM,
        payload: name
    });
  }

  createTeam(team: Team): void{
    // console.log('creating Team');
    this.ngRedux.dispatch({
        type: TeamsActions.CREATE_TEAM,
        payload: team
    });
  }

  updateTeam(team: Player): void{
    // console.log('updating Team');
    this.ngRedux.dispatch({
        type: TeamsActions.EDIT_TEAM,
        payload: team
    });
  }

  listTeam(team: Team): void{
    this.ngRedux.dispatch({
      type: TeamsActions.LIST_TEAM,
      payload: team
   });
  }
}
