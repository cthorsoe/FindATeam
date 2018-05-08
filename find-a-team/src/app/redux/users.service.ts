import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Player } from '../entities/player';
import { UsersState } from '../store/store';
import { Team } from '../entities/team';
import { User } from '../entities/user';


@Injectable()
export class UsersService {
  playerList:Player[];
  teamList:Team[];
  
  constructor(private http: HttpClient) {
    
  }

    userLogin(){
      return this.http.get('http://localhost:3333/user-login');
    }
    getUser(username:String){
      return this.http.get('http://localhost:3333/get-user/' + username);
    }
    getUsers(){
      return this.http.get('http://localhost:3333/get-users');
    }
    deleteUser(id:String){
      // return this.http.delete('http://angular2api2.azurewebsites.net/api/internships/' + id, {responseType: 'text'});
      return this.http.delete('http://localhost:3333/delete-user', {responseType: 'text'});
    }
    editUser(user:Player){
      // return this.http.put('http://angular2api2.azurewebsites.net/api/internships/' + user.username, user, {responseType: 'text'});
      return this.http.put('http://localhost:3333/edit-user', {responseType: 'text'});
    }
    
    createUser(user:Player){
      //MAKE HTTP REQUEST TO SERVER TO CREATE IN DATABASE
      // return this.http.post('http://angular2api2.azurewebsites.net/api/internships', baby);
      // return this.http.get('http://localhost:3333/get-users');
      return this.http.post('http://localhost:3333/create-user', user, {responseType: 'text'});
      
    }
    listUser(user:User){
      return this.http.post('http://localhost:3333/list-user', user, {responseType: 'text'});
    }


   static getInitialUsersState() : UsersState{
    return { teamInvites: 0, user: undefined, selectedUser: undefined, selectedTeam: undefined, listedUsers:[], listedTeams: [] };
   }


}
