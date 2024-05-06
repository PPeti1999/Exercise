import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BodyDiaryWeekly } from '../models/bodyDiaryWeekly';
import { Observable } from 'rxjs';

const baseUrl = environment.appUrl;
@Injectable({
  providedIn: 'root'
})
export class BodydiaryweeklyService {

  constructor(private http: HttpClient) {}
  baseUrl: string = `${baseUrl}/api/BodyDairyWeekly`;


  ListActualBodyDiaryWeekly(id: string): Observable<BodyDiaryWeekly[]> {
    const url = `${this.baseUrl}/${id}`;

    return this.http.get<BodyDiaryWeekly[]>(url);
  }



  AddBodyDiaryWeekly(bodyDiary: BodyDiaryWeekly): Observable<BodyDiaryWeekly> {
    console.log(bodyDiary);
    return this.http.post<BodyDiaryWeekly>(this.baseUrl, bodyDiary, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

