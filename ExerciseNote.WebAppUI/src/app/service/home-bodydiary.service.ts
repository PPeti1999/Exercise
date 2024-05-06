import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BodyDiary } from '../models/bodyDiary';
import { Observable } from 'rxjs';
const baseUrl = environment.appUrl;
@Injectable({
  providedIn: 'root'
})
export class HomeBodydiaryService {
  constructor(private http: HttpClient) {}
  baseUrl: string = `${baseUrl}/api/BodyDairy`;
  GetLastBodyDiary(id: string): Observable<BodyDiary> {
    const url = `${this.baseUrl}/${id}`;

    return this.http.get<BodyDiary>(url);
  }
  AddBodyDiary(bodyDiary: BodyDiary): Observable<BodyDiary> {
    console.log(bodyDiary);
    return this.http.post<BodyDiary>(this.baseUrl, bodyDiary, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}