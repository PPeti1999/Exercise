import { Component } from '@angular/core';
import { BodyDiary } from '../models/bodyDiary';
import { HomeBodydiaryService } from '../service/home-bodydiary.service';
import { User } from '../shared/models/account/user';
import { AccountService } from '../account/account.service';
import { BodyDiaryWeekly } from '../models/bodyDiaryWeekly';
import { BodydiaryweeklyService } from '../service/bodydiaryweekly.service';

@Component({
  selector: 'app-home-bodydiary',
  templateUrl: './home-bodydiary.component.html',
  styleUrl: './home-bodydiary.component.css'
})
export class HomeBodydiaryComponent {
  bodyDiary: BodyDiary;
  currentUser: User | null = null;
  bodyDaryWeeklyList: BodyDiaryWeekly[];
  data: any;
  chartData: any;
  selectedCardData: any;
displayModal: boolean = false;


constructor(private _BodydiaryweeklyService:BodydiaryweeklyService,private _homeBodyDiaryService: HomeBodydiaryService, public _accountService: AccountService
  )  {}
    ngOnInit(): void {
      this.loadCurrentUser();
      this.GetLastBodyDiary(this.currentUser);
      
    }

    openModel(bodyDaryWeekly: any){
      const modelDiv=document.getElementById('myModal');
      if(modelDiv!=null){
        this.selectedCardData = bodyDaryWeekly;
        modelDiv.style.display='block';
      }
    }
    closeModel(){
      const modelDiv=document.getElementById('myModal');
      if(modelDiv!=null){
        modelDiv.style.display='none';
      }
    }



    ListActualBodyDiaryWeekly(){
   
      this._BodydiaryweeklyService.ListActualBodyDiaryWeekly(this.bodyDiary.id).subscribe({
        next: (res: BodyDiaryWeekly[]) => {
          this.bodyDaryWeeklyList = res;
          console.log("aktuális bodydairyweekly LIST:",this.bodyDaryWeeklyList);


          this.chartData = {
            labels: this.bodyDaryWeeklyList.map(item => this.formatDate(item.created_at)), // Assuming there's a 'date' property in BodyDiaryWeekly
            datasets: [
              {
                data: this.bodyDaryWeeklyList.map(item => item.weight), // Using the 'weight' property for data
                label: 'Weight'
              }
            ]
          };
      




        },
        error: (err) => console.error(err),
      });
    
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    return `${month} ${day}`;
  }
  GetLastBodyDiary(u:User| null): void {// legutolso userhez készuld bodydairy
    const userId = u ? u.id : ''; // Providing a default value if id is undefined
  this._homeBodyDiaryService.GetLastBodyDiary(userId).subscribe({
    next: (res: BodyDiary) => {
      this.bodyDiary = res;
      console.log("aktuális bodydairy:",this.bodyDiary);
      this.ListActualBodyDiaryWeekly();
    
    },
    error: (err) => console.error(err),
  });
 
}

loadCurrentUser() {//aktuális user
  this._accountService.user$.subscribe((user: User | null) => {
    this.currentUser = user;
    if (user) {
      console.log('Bejelentkezett felhasználó:', user);
    } else {
      console.log('Nincs bejelentkezett felhasználó.');
    }
  });
}

}
