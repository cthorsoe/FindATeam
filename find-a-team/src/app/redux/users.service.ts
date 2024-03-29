import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Player } from '../entities/player';
import { UsersState } from '../store/store';
import { Team } from '../entities/team';
import { User } from '../entities/user';
import { Invite } from '../entities/invite';


@Injectable()
export class UsersService {
    // webserviceUrl:string = 'https://api.cthorsoe.host/';
    webserviceUrl:string = 'http://localhost:3333/';
    constructor(private http: HttpClient) {
        
    }
   
    userLogin(loginForm){
      console.log('loginForm', loginForm);
      return this.http.post(this.webserviceUrl + 'users/login/', loginForm);
    }
    loginBySession(session){
        console.log('SESSION', session)
      return this.http.post(this.webserviceUrl + 'users/login-by-session/', session);
    }

    userLogout(sessionid){
      console.log('sessionid', sessionid)
      return this.http.delete(this.webserviceUrl + 'users/delete-login-session/' + sessionid, {responseType: 'text'});
    }
    getUser(username:String){
      return this.http.get(this.webserviceUrl + 'users/get-user/' + username);
    }
    getUsers(){
        return this.http.get(this.webserviceUrl + 'users/get-listed-users');
    }

    deleteUser(id:String){
      // return this.http.delete('http://angular2api2.azurewebsites.net/api/internships/' + id, {responseType: 'text'});
      return this.http.delete(this.webserviceUrl + 'users/delete-user', {responseType: 'text'});
    }
    editUser(user:User){
      // return this.http.put('http://angular2api2.azurewebsites.net/api/internships/' + user.username, user, {responseType: 'text'});
      return this.http.put(this.webserviceUrl + 'users/edit-user', user, {responseType: 'text'});
    }
    
    createUser(user:Player){
      //MAKE HTTP REQUEST TO SERVER TO CREATE IN DATABASE
      // return this.http.post('http://angular2api2.azurewebsites.net/api/internships', baby);
      // return this.http.get(this.webserviceUrl + 'users/get-users');
      return this.http.post(this.webserviceUrl + 'users/create-user', user, {responseType: 'text'});
      
    }
    listUser(user:User){
      return this.http.post(this.webserviceUrl + 'users/list-user', user, {responseType: 'text'});
    }
    /* getTeamInvites(username:string){
        console.log('get team invites username', username)
    //   return this.http.get(this.webserviceUrl + 'users/get-team-invites-count/' + username);
      return this.http.get(this.webserviceUrl + 'users/get-team-invites/' + username);
    }

    acceptInvite(invite:any){
        console.log('invite', invite);
        return this.http.post(this.webserviceUrl + 'users/accept-team-invite', invite, {responseType: 'text'});
    } */

    


   static getInitialUsersState() : UsersState{
    return { loggedIn:{loggedIn: false, loggedInWithForm: false, userRole: "Guest"}, user: undefined, selectedUser: undefined, listedUsers:[], failedAutoLogin:false, invitableTeams: []};
    // return { /* teamInvites: [], */ loggedIn:{loggedIn: false, loggedInWithForm: false, userRole: "Guest"}, user: undefined, selectedUser: undefined, invitableTeams: [], listedUsers:[]};
   }


}
