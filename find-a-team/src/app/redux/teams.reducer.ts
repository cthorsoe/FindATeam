import { TeamsActions } from './teams.actions';
import { TeamsState } from '../store/store';
import { tassign } from 'tassign';
import { TeamsService } from './teams.service';
import { Team } from '../entities/team';

const INITIAL_STATE: TeamsState = TeamsService.getInitialTeamsState();

export function teamsReducer(state: TeamsState = INITIAL_STATE, action:any) {
  let newTeamsArray;
  let index;
  switch (action.type) {

    /* ------------------------------------ GET SPECIFIC TEAM BEGIN ------------------------------------ */
    case TeamsActions.GET_SPECIFIC_TEAM: // action.payload: empty
      return state;

    case TeamsActions.SUCCESS_GET_SPECIFIC_TEAM: // action.payload: Team[]
      console.log('PAYLOAD', action.payload);
      return tassign(state, {selectedTeam: action.payload as Team})

    case TeamsActions.FAILED_GET_SPECIFIC_TEAM: // action.payload: empty
      return state;
    /* ------------------------------------ GET SPECIFIC TEAM END ------------------------------------ */

    /* ------------------------------------ GET TEAMS BEGIN ------------------------------------ */
    case TeamsActions.GET_TEAMS: // action.payload: empty
      return state;

    case TeamsActions.SUCCESS_GET_TEAMS: // action.payload: Team[]
      console.log('PAYLOAD', action.payload);
      return tassign(state, {listedTeams: action.payload as Team[]})

    case TeamsActions.FAILED_GET_TEAMS: // action.payload: empty
      return state;
    /* ------------------------------------ GET TEAMS END ------------------------------------ */

    /* ------------------------------------ GET MY TEAMS BEGIN ------------------------------------ */
    case TeamsActions.GET_MY_TEAMS: // action.payload: username
      return state;

    case TeamsActions.SUCCESS_GET_MY_TEAMS: // action.payload: Team[]
      console.log('PAYLOAD', action.payload);
      return tassign(state, {teams: action.payload as Team[]})

    case TeamsActions.FAILED_GET_MY_TEAMS: // action.payload: empty
      return state;
    /* ------------------------------------ GET  TEAMS END ------------------------------------ */

    /* ------------------------------------ CREATE TEAM BEGIN ------------------------------------ */
    case TeamsActions.CREATE_TEAM: // action.payload: empty
    return state;
    
    case TeamsActions.SUCCESS_CREATE_TEAM: // action.payload: Team
      console.log('PAYLOAD', action.payload);
      return tassign(state, {teams: [...state.teams, action.payload]});
      // return state;
    
    case TeamsActions.FAILED_CREATE_TEAM: // action.payload: empty
      return state;
    /* ------------------------------------ CREATE TEAM END ------------------------------------ */

    /* ------------------------------------ DELETE TEAM BEGIN ------------------------------------ */
    case TeamsActions.DELETE_TEAM: // action.payload: empty
      return state;

    case TeamsActions.SUCCESS_DELETE_TEAM: // action.payload: id:number
      console.log('PAYLOAD', action.payload);
      newTeamsArray = [... state.listedTeams];
      index = newTeamsArray.findIndex(x => x.id == action.payload);
      if(index > -1){
        newTeamsArray.splice(index, 1);
        return tassign(state, {listedTeams: newTeamsArray})
      }
      return state;
    case TeamsActions.FAILED_DELETE_TEAM: // action.payload: empty
      return state;
    /* ------------------------------------ DELETE TEAM END ------------------------------------ */

    /* ------------------------------------ EDIT TEAM BEGIN ------------------------------------ */
    case TeamsActions.EDIT_TEAM: // action.payload: empty
      return state;
    
    case TeamsActions.SUCCESS_EDIT_TEAM: // action.payload: Team
      console.log('PAYLOAD', action.payload);
      newTeamsArray = [... state.listedTeams];
      index = newTeamsArray.findIndex(x => x.username == action.payload.username);
      if(index > -1){
        newTeamsArray[index] = action.payload
        return tassign(state, {listedTeams: newTeamsArray})
      }
      return state;
    
    case TeamsActions.FAILED_EDIT_TEAM: // action.payload: empty
      return state;
    
    /* ------------------------------------ EDIT TEAM END ------------------------------------ */

    /* ------------------------------------ CREATE TEAM BEGIN ------------------------------------ */
    case TeamsActions.LIST_TEAM: // action.payload: empty
    return state;
    
    case TeamsActions.SUCCESS_LIST_TEAM: // action.payload: Team
      console.log('PAYLOAD', action.payload);
      index = state.listedTeams.findIndex(x => x.id == action.payload.id);
      if(index == -1){
        return tassign(state, {listedTeams: [...state.listedTeams, action.payload]})
      }
      return state;
    
    case TeamsActions.FAILED_LIST_TEAM: // action.payload: empty
      return state;
    /* ------------------------------------ CREATE TEAM END ------------------------------------ */
    default:
      return state;
 }
}
