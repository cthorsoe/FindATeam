import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { PortalComponent } from './portal/portal.component';
import { FindTeamComponent } from './find-team/find-team.component';
import { FindPlayerComponent } from './find-player/find-player.component';
import { ListPlayerComponent } from './list-player/list-player.component';
import { ListTeamComponent } from './list-team/list-team.component';
import { LoginComponent } from './login/login.component';
import { MyTeamsComponent } from './my-teams/my-teams.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ProfileComponent } from './profile/profile.component';
import { CreateTeamComponent } from './create-team/create-team.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
// import { AdminComponent } from './admin/admin/admin.component';
// import { DashboardComponent } from './admin/dashboard/dashboard.component';
// import { ManageTeamsComponent } from './admin/manage-teams/manage-teams.component';
// import { ManagePlayersComponent } from './admin/manage-players/manage-players.component';
import { AuthGuardAdminService } from './services/auth-guard-admin.service';

const routes: Routes = [
    { path: '', redirectTo:'app/home', pathMatch: 'full' },
    { path: 'app', component: PortalComponent,
      children: [
            { path: '', component: HomeComponent},
            { path: 'home', component: HomeComponent},
            { path: 'login', component: LoginComponent},
            { path: 'register', component: RegisterComponent},
            { path: 'teams', component: FindTeamComponent},
            { path: 'players', component: FindPlayerComponent},
            { path: 'profile/:username', component: ProfileComponent},
            { path: 'list-player', component: ListPlayerComponent, canActivate:[AuthGuardService]},
            { path: 'list-team', component: ListTeamComponent, canActivate:[AuthGuardService]},
            { path: 'my-teams', component: MyTeamsComponent, canActivate:[AuthGuardService]},
            { path: 'edit-profile', component: EditProfileComponent, canActivate:[AuthGuardService]},
            { path: 'create-team', component: CreateTeamComponent, canActivate:[AuthGuardService]},
          ],
      },
      {
        path: 'admin',
        loadChildren: 'app/admin/admin.module#AdminModule'
      },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
