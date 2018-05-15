import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Player } from '../entities/player';
import { TeamsState } from '../store/store';
import { Team } from '../entities/team';


@Injectable()
export class TeamsService {
  
  constructor(private http: HttpClient) {
    
  }

    getTeam(id:number){
      return this.http.get('http://localhost:3333/get-team/' + id);
    }
    getTeams(){
      return this.http.get('http://localhost:3333/get-listed-teams');
    }

    getMyTeams(username:String){
      return this.http.get('http://localhost:3333/get-my-teams/' + username);
    }
    deleteTeam(id:number){
      // return this.http.delete('http://angular2api2.azurewebsites.net/api/internships/' + id, {responseType: 'text'});
      return this.http.delete('http://localhost:3333/delete-team', {responseType: 'text'});
    }
    editTeam(team:Team){
      // return this.http.put('http://angular2api2.azurewebsites.net/api/internships/' + user.username, user, {responseType: 'text'});
      return this.http.put('http://localhost:3333/edit-team', {responseType: 'text'});
    }
    
    createTeam(team:Team){
      //MAKE HTTP REQUEST TO SERVER TO CREATE IN DATABASE
      // return this.http.post('http://angular2api2.azurewebsites.net/api/internships', baby);
      // return this.http.get('http://localhost:3333/get-users');
      return this.http.post('http://localhost:3333/create-team', team, {responseType: 'text'});
      
    }
    listTeam(id:number){
      console.log('LISTING TEAM');
      return this.http.post('http://localhost:3333/list-team', id, {responseType: 'text'});
    }


   static getInitialTeamsState() : TeamsState{
      return {teams: [], selectedTeam: undefined, listedTeams: [] };
   }

   
}