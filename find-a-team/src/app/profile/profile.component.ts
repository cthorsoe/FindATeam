import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { User } from '../entities/user';
import { UsersActions } from '../redux/users.actions';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store/store';
import { SocketService } from '../services/socket.service';
import { Team } from '../entities/team';
import { Invite } from '../entities/invite';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
    username:String;
    user:User;
    loggedInUser:User = undefined;
    invitableTeams:Team[] = [];
    selectedTeam:Team = undefined;
    routeSubscription;
    subscription;
    // teamSubscription;
  constructor(private route: ActivatedRoute, private usersActions:UsersActions, private ngRedux:NgRedux<IAppState>, private socketService:SocketService) {}

    ngOnInit() {
        this.routeSubscription = this.route.params.subscribe(params => {
            this.username = params.username;
            this.usersActions.getSpecificUser(this.username);
            this.subscription = this.ngRedux.select(state => state).subscribe(state => {
                // console.log('RESPONSE', data);
                if(state.users.selectedUser != undefined){
                    this.user = state.users.selectedUser;
                    if(state.users.user != undefined){
                        this.loggedInUser = state.users.user;
                        console.log(this.loggedInUser)
                        if(state.teams.teams.length > 0){
                            console.log('SETTING INVITABLE TEAMS');
                            this.invitableTeams = state.teams.teams;
                            this.removeJoinedTeams();
                        }
                    }
                }
            });
            /* this.teamSubscription = this.ngRedux.select(state => state.teams).subscribe(state => {
                console.log('TEAM SUBSCRIPTION HIT');
                console.log('STATE TEAMS', state.teams);
                
            }); */
        });
    }
    ngOnDestroy(){

    }
    inviteUser(){
        this.socketService.invite({user:this.user, team:this.selectedTeam} as Invite)
    }
    // isUserInTeam(team:Team) {
    //     console.log('isUserInTeam')
    //     console.log('members', team.members)
    //     console.log('user', this.user)
    //     if(team.members.findIndex(member => member.id == this.user.id) > -1){
    //         console.log('false')
    //         return false
    //     }else{
    //         console.log('true')
    //         return true
    //     }
    // }
    removeJoinedTeams(){
        for (let i = 0; i < this.invitableTeams.length; i++) {
            const team = this.invitableTeams[i];
            if(team.members.findIndex(member => member.id == this.user.id) > -1){
                console.log('splicing', team);
                this.invitableTeams.splice(i, 1);
                i--;
            }else{
            }
            
        }
    }

}
