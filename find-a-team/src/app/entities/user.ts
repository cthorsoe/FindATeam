import { Player } from "./player";
import { Team } from "./team";

export class User extends Player {
  public description?:String;
  public teams:Team[];
}
