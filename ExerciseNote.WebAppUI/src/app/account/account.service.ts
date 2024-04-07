import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Register } from '../shared/models/account/register';
import { environment } from '../../environments/environment.development';
import { Login } from '../shared/models/account/login';
import { User } from '../shared/models/account/user';
import { ReplaySubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userSource = new ReplaySubject<User | null>(1);// OBSERVER AMIRE FELIRATKOZUNK ami egy lehet //jo
  user$ = this.userSource.asObservable();// itt feliratkozunk ra//jo
  constructor(private http: HttpClient, //jo
    private router: Router,
    ) { }
    login(model: Login) {// konkret user belepes
     
     // return this.http.post<User>(`${environment.appUrl}account/login`, model)
     return this.http.post<User>(`${environment.appUrl}/api/account/login`, model).pipe(
        map((user: User) => {
          if (user) {
            this.setUser(user);
            return user;
          }
          return null;
        })
      );
    }
    register(model: Register) {
      return this.http.post(`${environment.appUrl}/api/account/register`, model);//jo
    }
    private setUser(user: User) {
     // this.stopRefreshTokenTimer();
     // this.startRefreshTokenTimer(user.jwt);
      localStorage.setItem(environment.userKey, JSON.stringify(user));// enviroment userkey e local storageben eltaroljuk //jo
      this.userSource.next(user);// itt is
      //this.user$.subscribe({next: response => console.log(response)})
      //this.sharedService.displayingExpiringSessionModal = false;
      //this.checkUserIdleTimout();
    }
}
