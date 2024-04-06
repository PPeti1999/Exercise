import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Register } from '../shared/models/account/register';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient, 
    private router: Router,
    ) { }
    register(model: Register) {
      return this.http.post(`${environment.appUrl}/api/account/register`, model);
    }
}
