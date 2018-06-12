import { Player } from "./player";
import { Team } from "./team";
import { Invite } from "./invite";

export class User extends Player {
  public isAdmin:boolean = false; 
  public description?:String;
  public uploadedImage?:File;
  public teams:Team[];
}
