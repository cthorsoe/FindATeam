import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageTeamsComponent } from './manage-teams/manage-teams.component';
import { ManagePlayersComponent } from './manage-players/manage-players.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
    { path: '', component: AdminComponent,
        children: [
            { path: '', component: DashboardComponent},
            { path: 'dashboard', component: DashboardComponent },
            { path: 'manage-teams', component: ManageTeamsComponent },
            { path: 'manage-players', component: ManagePlayersComponent }
        ],
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
