import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { AccountService } from '../account/account.service';
import { HomeBodydiaryService } from '../service/home-bodydiary.service';
import { User } from '../shared/models/account/user';
import { BodyDiary } from '../models/bodyDiary';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  currentUser: User | null = null;
  bodyDiary: BodyDiary;
  isLoading: Boolean = true; // Flag to track loading state
  constructor(  private _homeBodyDiaryService: HomeBodydiaryService, public _accountService: AccountService
    )  {}

  logout() {
    this._accountService.logout();

  }

  ngOnInit(): void {
  }
 
}
