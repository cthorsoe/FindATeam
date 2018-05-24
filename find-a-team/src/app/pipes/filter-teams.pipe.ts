import { Pipe, PipeTransform } from '@angular/core';
import { Team } from '../entities/team';

@Pipe({
  name: 'filterTeams'
})
export class FilterTeamsPipe implements PipeTransform {

  transform(teams: Team[], args: string): any {
    if (args && teams.length >= 0) {
      let teamsFound = teams.filter(
        team => team.name && team.name.toLowerCase().includes(args.toLowerCase())
        || team.members && team.members.length > 0 && team.members.findIndex(x => x.username.toLowerCase().includes(args.toLowerCase())) > -1
        || team.members && team.members.length > 0 && team.members.findIndex(x => x.firstname.toLowerCase().includes(args.toLowerCase())) > -1
        || team.members && team.members.length > 0 && team.members.findIndex(x => x.lastname.toLowerCase().includes(args.toLowerCase())) > -1
      );
      if (teamsFound && teamsFound.length > 0 ){
        return teamsFound;
      }
      return [-1]; // to display error message (none found) in view.
    }
    return teams;
  }

}
