import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PlayService {
// csak azoka az illetok latjaka  playt akik auth oltak
  constructor(private http:HttpClient) { }
  getPlayers(){
    return this.http.get(`${environment.appUrl}/api/play/get-players`);
  }
}
