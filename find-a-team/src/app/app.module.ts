import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuardService } from './services/auth-guard.service';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { FormBuilder } from '@angular/forms';
import { UsersEpic } from './redux/users.epic';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { createLogger } from 'redux-logger';
import { IAppState, rootReducer } from './store/store';
import { NgRedux, DevToolsExtension, NgReduxModule } from '@angular-redux/store';
import {HttpClientModule } from '@angular/common/http';
import { UsersService } from './redux/users.service';
import { UsersActions } from './redux/users.actions';
import { PortalComponent } from './portal/portal.component';
import { FindTeamComponent } from './find-team/find-team.component';
import { FindPlayerComponent } from './find-player/find-player.component';
import { ListPlayerComponent } from './list-player/list-player.component';
import { ListTeamComponent } from './list-team/list-team.component';
import { LoginComponent } from './login/login.component';
import { MyTeamsComponent } from './my-teams/my-teams.component';
import { FilterPlayersPipe } from './pipes/filter-players.pipe';
import { AgePipe } from './pipes/age.pipe';
import { MomentModule } from 'angular2-moment/moment.module';
import { AuthService } from './services/auth.service';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ProfileComponent } from './profile/profile.component';
import { TeamsEpic } from './redux/teams.epic';
import { TeamsService } from './redux/teams.service';
import { TeamsActions } from './redux/teams.actions';
import { CreateTeamComponent } from './create-team/create-team.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';


@NgModule({
  declarations: [
    AppComponent,
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
    MyProfileComponent,
    ProfileComponent,
    CreateTeamComponent,
    EditProfileComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgReduxModule,
    FormsModule,
    MomentModule
  ],
  providers: [AuthGuardService, AuthService, UsersEpic, UsersService, UsersActions, TeamsEpic, TeamsService, TeamsActions],
  // providers: [AuthGuardService, AuthService, UsersEpic, UsersService, UsersActions],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private ngRedux: NgRedux<IAppState>, private devTool: DevToolsExtension, private usersEpic: UsersEpic, private teamsEpic: TeamsEpic){
    const rootEpic = combineEpics(
      this.usersEpic.getSpecificUser,
      this.usersEpic.getUsers,
      this.usersEpic.getTeamInvites,
      this.usersEpic.deleteUser,
      this.usersEpic.editUser,
      this.usersEpic.createUser,
      this.usersEpic.userLogin,
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
