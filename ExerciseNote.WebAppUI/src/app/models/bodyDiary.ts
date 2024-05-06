import { User } from "../shared/models/account/user";
import { Photo } from "./photo";

export class BodyDiary {
  public id: string;
  public idUser: string;
  public age: number;
  public height: number;
  public weight: number;
  public bodyFat: number;
  public photo: Photo;
  public maintainWeight: number ;
  public weightLoss: number ;
  public weightGain: number ;
  public created_at: string ;


  
}
