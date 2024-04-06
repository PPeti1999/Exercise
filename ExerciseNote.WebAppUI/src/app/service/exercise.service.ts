import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Exercise } from '../models/exercise';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

const baseUrl = environment.appUrl;
@Injectable({
  providedIn: 'root'
})

export class ExerciseService {
  
  constructor(private http: HttpClient) {}
  baseUrl: string = `${baseUrl}/api/exercise`;

  getExercise(): Observable<Exercise[]> {
   
    return this.http.get<Exercise[]>(this.baseUrl);
  }
  // getExercise() params

  getExerciseById(id: string): Observable<Exercise> {
    const url = `${this.baseUrl}/${id}`;

    return this.http.get<Exercise>(url);
  }


  createExercise(exercise: Exercise): Observable<Exercise> {
    console.log(exercise);
    return this.http.post<Exercise>(this.baseUrl, exercise, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  updateExercise(exercise: Exercise): Observable<Exercise> {
    return this.http.put<Exercise>(this.baseUrl, exercise);
  }

  deleteeExercise(id: string): Observable<boolean> {
    const url = `${this.baseUrl}/${id}`;

    return this.http.delete<boolean>(url);
  }
}
