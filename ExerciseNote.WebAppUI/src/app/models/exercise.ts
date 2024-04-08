import { ExerciseType } from "./exerciseType";
import { Photo } from "./photo";

export class Exercise {
  public id?: number;
  public title: string;
  public type: ExerciseType;
  public body: string;
  public created_at: string ;
  public photo: Photo;
  
}
