import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { WorkoutPlan } from '../models/workoutPlan';
import { Observable } from 'rxjs';
const baseUrl = environment.appUrl;
@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root'
})
export class WorkoutplanService {

  
  constructor(private http: HttpClient) {}
  baseUrl: string = `${baseUrl}/api/WorkoutPlan`;


  ListActualWorkoutPlan(id: string): Observable<WorkoutPlan[]> {
    const url = `${this.baseUrl}/${id}`;

    return this.http.get<WorkoutPlan[]>(url);
  }



  AddWorkoutPlan (bodyDiary: WorkoutPlan): Observable<WorkoutPlan> {
    console.log("itt a baj:?",bodyDiary);
    return this.http.post<WorkoutPlan>(this.baseUrl, bodyDiary, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
