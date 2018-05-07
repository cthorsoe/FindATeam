import {Injectable, Pipe, PipeTransform} from '@angular/core';
import { Player } from '../entities/player';
@Pipe({name: 'filterPlayers'})
@Injectable()
export class FilterPlayersPipe implements PipeTransform {
     transform(items: Player[], args: string): any {
     if (args && items.length >= 0) {
       let itemsFound = items.filter(
         item => item.firstname && item.firstname.toLowerCase().includes(args.toLowerCase())
         || item.lastname && item.lastname.toLowerCase().includes(args.toLowerCase())
         || item.username && item.username.toLowerCase().includes(args.toLowerCase())
       );
       if (itemsFound && itemsFound.length > 0 ){
         return itemsFound;
       }
       return [-1]; // to display error message (none found) in view.
     }
   return items;
 }
}
