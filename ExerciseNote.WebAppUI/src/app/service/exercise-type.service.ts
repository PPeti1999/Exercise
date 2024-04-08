import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Exercise } from '../models/exercise';
import { ExerciseType } from '../models/exerciseType';
import { environment } from '../../environments/environment.development';
const baseUrl = environment.appUrl;
@Injectable({
  providedIn: 'root'
})

export class ExerciseTypeService {
  
  constructor(private http: HttpClient) {}
  baseUrl: string = `${baseUrl}/api/exercisetype`;

  getType(): Observable<ExerciseType[]> {
    return this.http.get<ExerciseType[]>(this.baseUrl);
  }

  addExerciseType(type: ExerciseType): Observable<ExerciseType> {
    return this.http.post<ExerciseType>(this.baseUrl, type);
  }
}
