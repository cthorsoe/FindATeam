import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortalComponent } from './portal/portal.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FindTeamComponent } from './find-team/find-team.component';
import { FindPlayerComponent } from './find-player/find-player.component';
import { ProfileComponent } from './profile/profile.component';
import { ListPlayerComponent } from './list-player/list-player.component';
import { ListTeamComponent } from './list-team/list-team.component';
import { MyTeamsComponent } from './my-teams/my-teams.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CreateTeamComponent } from './create-team/create-team.component';
import { AuthGuardService } from '../services/auth-guard.service';

const routes: Routes = [
    {
        path: 'app',
        component: PortalComponent,
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
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalRoutingModule { }
