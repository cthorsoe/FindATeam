import { routerReducer } from '@angular-redux/router';
import { combineReducers } from 'redux';
import { Player } from '../entities/player';
import { Team } from '../entities/team';
import { usersReducer } from '../redux/users.reducer';
import { User } from '../entities/user';

export class UsersState {
  teamInvites:number;
  user: User;
  selectedUser: User;
  selectedTeam: Team;
  listedUsers: Player[];
  listedTeams: Team[];
}
export class IAppState {
 users?: UsersState;
}

export const rootReducer = combineReducers<IAppState>({
  users: usersReducer,
  //  teams: teamsReducer,
  // when you add more reducers, add them here..

 router: routerReducer
});
