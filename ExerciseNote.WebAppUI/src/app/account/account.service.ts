import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Register } from '../shared/models/account/register';
import { environment } from '../../environments/environment.development';
import { Login } from '../shared/models/account/login';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient, 
    private router: Router,
    ) { }
    login(model: Login) {
      return this.http.post(`${environment.appUrl}/api/account/login`, model)
      /*return this.http.post<User>(`${environment.appUrl}account/login`, model, {withCredentials: true})
      .pipe(
        map((user: User) => {
          if (user) {
            this.setUser(user);
          }
        })
      );*/
    }
    register(model: Register) {
      return this.http.post(`${environment.appUrl}/api/account/register`, model);
    }
}
