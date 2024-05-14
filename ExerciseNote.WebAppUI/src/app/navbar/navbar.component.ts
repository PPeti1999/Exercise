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
    this.loadCurrentUser();
  }
  loadCurrentUser() {//aktuális user
    this._accountService.user$.subscribe((user: User | null) => {
      this.currentUser = user;
      if (user) {
        console.log('Bejelentkezett felhasználó:', user);
        this.GetLastBodyDiary(this.currentUser);
      } else {
        console.log('Nincs bejelentkezett felhasználó.');
      }
    });
  }
  GetLastBodyDiary(u: User | null): void {
    const userId = u ? u.id : '';
    console.log("kint van ",userId);
    if (userId!=''){
    console.log("bejutott.")
      this._homeBodyDiaryService.GetLastBodyDiary(userId).subscribe({
        next: (res: BodyDiary) => {
            if (res) {
                this.bodyDiary = res;
                
                this.isLoading = false; // Set loading flag to false in case of error
            } else {
                console.log('No Body Diary found.');
                // Set isLoading to false here if needed
            }
        },
        error: (err) => {
            console.error(err);
            // Set isLoading to false here if needed
        }
    });
    }

} 
}
