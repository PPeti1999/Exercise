import { Injectable } from '@angular/core';
import { environment } from '../environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Exercise } from '../models/exercise';
import { ExerciseType } from '../models/exerciseType';
const baseUrl = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})

export class ExerciseTypeService {
  
  constructor(private http: HttpClient) {}
  baseUrl: string = `${baseUrl}/exercisetype`;

  getType(): Observable<ExerciseType[]> {
    return this.http.get<ExerciseType[]>(this.baseUrl);
  }

  addExerciseType(type: ExerciseType): Observable<ExerciseType> {
    return this.http.post<ExerciseType>(this.baseUrl, type);
  }
}
