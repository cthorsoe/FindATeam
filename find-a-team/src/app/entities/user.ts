import { Player } from "./player";
import { Team } from "./team";

export class User extends Player {
  public isAdmin:boolean = false; 
  public description?:String;
  public teams:Team[];
}
