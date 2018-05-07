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

const routes: Routes = [
    { path: '', redirectTo:'app/home', pathMatch: 'full' },
    { path: 'app', component: PortalComponent,
      children: [
            { path: 'home', component: HomeComponent},
            { path: 'login', component: LoginComponent},
            { path: 'register', component: RegisterComponent},
            { path: 'teams', component: FindTeamComponent},
            { path: 'players', component: FindPlayerComponent},
            { path: 'profile/:username', component: ProfileComponent},
            { path: 'list-player', component: ListPlayerComponent, canActivate:[AuthGuardService]},
            { path: 'list-team', component: ListTeamComponent, canActivate:[AuthGuardService]},
            { path: 'my-teams', component: MyTeamsComponent, canActivate:[AuthGuardService]},
            { path: 'my-profile', component: FindPlayerComponent, canActivate:[AuthGuardService]},
          ],
      },
    // { path: 'register', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
