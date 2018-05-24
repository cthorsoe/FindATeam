import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalRoutingModule } from './portal-routing.module';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { PortalComponent } from './portal/portal.component';
import { FindTeamComponent } from './find-team/find-team.component';
import { FindPlayerComponent } from './find-player/find-player.component';
import { ListPlayerComponent } from './list-player/list-player.component';
import { ListTeamComponent } from './list-team/list-team.component';
import { LoginComponent } from './login/login.component';
import { MyTeamsComponent } from './my-teams/my-teams.component';
import { FilterPlayersPipe } from '../pipes/filter-players.pipe';
import { AgePipe } from '../pipes/age.pipe';
import { ProfileComponent } from './profile/profile.component';
import { CreateTeamComponent } from './create-team/create-team.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { FilterTeamsPipe } from '../pipes/filter-teams.pipe';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { createLogger } from 'redux-logger';
import { NgRedux, DevToolsExtension, NgReduxModule } from '@angular-redux/store';
import { IAppState, rootReducer } from '../store/store';
import { UsersEpic } from '../redux/users.epic';
import { TeamsEpic } from '../redux/teams.epic';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MomentModule } from 'angular2-moment/moment.module';
import { AuthGuardService } from '../services/auth-guard.service';
import { AuthGuardAdminService } from '../services/auth-guard-admin.service';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../redux/users.service';
import { UsersActions } from '../redux/users.actions';
import { TeamsService } from '../redux/teams.service';
import { TeamsActions } from '../redux/teams.actions';

@NgModule({
  imports: [
        CommonModule,
        PortalRoutingModule,
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgReduxModule,
        FormsModule,
        MomentModule
    ],
    declarations: [    
        RegisterComponent,
        HomeComponent,
        PortalComponent,
        FindTeamComponent,
        FindPlayerComponent,
        ListPlayerComponent,
        ListTeamComponent,
        LoginComponent,
        MyTeamsComponent,
        FilterPlayersPipe,
        AgePipe,
        ProfileComponent,
        CreateTeamComponent,
        EditProfileComponent,
        FilterTeamsPipe
    ],
    providers: [AuthGuardService, AuthGuardAdminService, AuthService, UsersEpic, UsersService, UsersActions, TeamsEpic, TeamsService, TeamsActions],
})
export class PortalModule { 
    constructor(private ngRedux: NgRedux<IAppState>, private devTool: DevToolsExtension, private usersEpic: UsersEpic, private teamsEpic: TeamsEpic){
        console.log('portal constructor')
        const rootEpic = combineEpics(
          this.usersEpic.getSpecificUser,
          this.usersEpic.getUsers,
          this.usersEpic.getTeamInvites,
          this.usersEpic.deleteUser,
          this.usersEpic.editUser,
          this.usersEpic.createUser,
          this.usersEpic.userLogin,
          this.usersEpic.loginBySession,
          this.usersEpic.userLogout,
          this.usersEpic.listUser,
          this.teamsEpic.getSpecificTeam,
          this.teamsEpic.getTeams,
          this.teamsEpic.getMyTeams,
          this.teamsEpic.deleteTeam,
          this.teamsEpic.editTeam,
          this.teamsEpic.createTeam,
          this.teamsEpic.listTeam
        );
    
        const middleware = [
          createEpicMiddleware(rootEpic), createLogger({ level: 'info', collapsed: true })
        ];
    
        this.ngRedux.configureStore(
          rootReducer,
          {}, middleware, [ devTool.isEnabled() ? devTool.enhancer() : f => f]);
      }
}
