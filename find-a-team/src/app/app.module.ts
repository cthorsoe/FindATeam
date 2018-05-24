import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PortalModule } from './portal-moule/portal.module';
import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    /*
    AdminComponent,
    ManageTeamsComponent,
    ManagePlayersComponent,
    DashboardComponent,*/
    
  ],
  imports: [
      AppRoutingModule,
      /*
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgReduxModule,
    FormsModule,
    MomentModule*/
  ],
  providers: [],
  // providers: [AuthGuardService, AuthService, UsersEpic, UsersService, UsersActions],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
