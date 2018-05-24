import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManagePlayersComponent } from './manage-players/manage-players.component';
import { ManageTeamsComponent } from './manage-teams/manage-teams.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  declarations: [AdminComponent, DashboardComponent, ManagePlayersComponent, ManageTeamsComponent]
})
export class AdminModule { }
