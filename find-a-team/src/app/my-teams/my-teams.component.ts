import { Component, OnInit, OnDestroy } from '@angular/core';
import { Team } from '../entities/team';
import { IAppState } from '../store/store';
import { NgRedux } from '@angular-redux/store';
import { TeamsActions } from '../redux/teams.actions';
import { UsersActions } from '../redux/users.actions';

@Component({
  selector: 'app-my-teams',
  templateUrl: './my-teams.component.html',
  styleUrls: ['./my-teams.component.scss']
})
export class MyTeamsComponent implements OnInit, OnDestroy {
    teamList:Team[] = new Array<Team>();
    invitedTeamList:Team[];
    userId:number
    // teamSearch:string;
    subscription;
    constructor(private ngRedux: NgRedux<IAppState>, private teamsActions: TeamsActions, private usersActions: UsersActions) { }

    ngOnInit() {
        this.subscription = this.ngRedux.select(state => state).subscribe(data => {
            this.userId = data.users.user.id;
            this.invitedTeamList = data.teams.teamInvites;
            if(data.teams.teams.length > this.teamList.length){
                this.teamList = data.teams.teams;
                for (let i = 0; i < this.teamList.length; i++) {
                    const team = this.teamList[i];
                    const index = team.members.findIndex(x => x.id == this.userId);
                    if(index == -1){
                        const invite = {teamId:team.id, userId:this.userId};
                        this.teamsActions.addUserToTeam({user: data.users.user, teamId:team.id});
                    }
                }
            }
        });
        // this.teamsActions.getMyTeams();
    }
    ngOnDestroy(){
        if(this.subscription){
            this.subscription.unsubscribe();
        }
    }

    acceptInvite(teamId:number){
        console.log('team ' + teamId + '\'s invite has been accepted')
        let invite = {teamId:teamId, userId:this.userId};
        this.teamsActions.acceptInvite(invite)
    }
    declineInvite(teamId:number){
        console.log('team ' + teamId + '\'s invite has been declined')
    }

}
