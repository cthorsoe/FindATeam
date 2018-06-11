import { routerReducer } from '@angular-redux/router';
import { combineReducers } from 'redux';
import { Player } from '../entities/player';
import { Team } from '../entities/team';
import { usersReducer } from '../redux/users.reducer';
import { teamsReducer } from '../redux/teams.reducer';
import { User } from '../entities/user';

/* export class UsersState {
  teamInvites:number;
  user: User;
  selectedUser: User;
  selectedTeam: Team;
  listedUsers: Player[];
  listedTeams: Team[];
} */

export class UsersState {
  teamInvites:number;
  loggedIn:any;
  user: User;
  selectedUser: User;
  listedUsers: Player[];
  failedAutoLogin: boolean;
}
export class TeamsState {
  teams: Team[];
  selectedTeam: Team;
  listedTeams: Team[];
}
export class IAppState {
 users?: UsersState;
 teams?: TeamsState;
}

export const rootReducer = combineReducers<IAppState>({
  users: usersReducer,
  teams: teamsReducer
});
