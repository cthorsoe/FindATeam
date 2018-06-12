import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Event } from '../entities/event';
import * as io from 'socket.io-client';


// const webserviceUrl = 'https://api.cthorsoe.host/';

@Injectable()
export class SocketService {

    private webserviceUrl = 'http://localhost:5000/';  
    private socket;
  
    invite(invite){
        this.socket.emit('on invite', invite);    
    }
    
    getInvites() {
        let observable = new Observable(observer => {
            this.socket = io(this.webserviceUrl);
            // console.log('SETTING UP LISTENERS')
            this.socket.on('user invited', (invite) => {
                observer.next(invite);    
            });
            return () => {
                this.socket.disconnect();
            };  
        })     
        return observable;
    }
    

}
