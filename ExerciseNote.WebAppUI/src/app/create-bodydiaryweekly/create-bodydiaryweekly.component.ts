import { Component } from '@angular/core';
import { BodyDiaryWeekly } from '../models/bodyDiaryWeekly';
import { Dialog } from '@angular/cdk/dialog';
import { BodydiaryweeklyService } from '../service/bodydiaryweekly.service';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../account/account.service';
import { User } from '../shared/models/account/user';
import { Observable, ReplaySubject } from 'rxjs';
import { HomeBodydiaryComponent } from '../home-bodydiary/home-bodydiary.component';
import { BodyDiary } from '../models/bodyDiary';
import { HomeBodydiaryService } from '../service/home-bodydiary.service';

@Component({
  selector: 'app-create-bodydiaryweekly',
  templateUrl: './create-bodydiaryweekly.component.html',
  styleUrl: './create-bodydiaryweekly.component.css'
})
export class CreateBodydiaryweeklyComponent {


  selectedFile: File | null;
  bodyDiaryWeekly: BodyDiaryWeekly = {} as BodyDiaryWeekly;
  showAlert: boolean = false;
  bodyDiary: BodyDiary;
  currentUser: User | null = null;
  constructor(private _homeBodyDiaryService: HomeBodydiaryService, public _accountService: AccountService,
    private _BodyDiaryWeeklyServcie: BodydiaryweeklyService, private dialog: Dialog,
    
    private route: ActivatedRoute,
    ) {}
  ngOnInit(): void {
    this.loadCurrentUser();
    this.GetLastBodyDiary(this.currentUser);
  }  
  GetLastBodyDiary(u:User| null): void {// aktualis bodydiaryid
    const userId = u ? u.id : ''; // Providing a default value if id is undefined
  this._homeBodyDiaryService.GetLastBodyDiary(userId).subscribe({
    next: (res: BodyDiary) => {
      this.bodyDiary = res;
    console.log("userid:",this.bodyDiary.idUser);
    console.log("bodyid:",this.bodyDiary.id);
    },
    error: (err) => console.error(err),
  });
}
  loadCurrentUser() {// aktuális user ID
    this._accountService.user$.subscribe((user: User | null) => {
     
      if(user!=null){
        this.currentUser = user;
        console.log("userid:",this.currentUser.id);
      }
     else this.currentUser=null;
    });
  }



 
  createBodyDiaryWeekly(): void {
   
    this.bodyDiaryWeekly.idBodyDairy=this.bodyDiary.id.toString();



  if (!this.selectedFile) {
    this.bodyDiaryWeekly = {
      ...this.bodyDiaryWeekly,
      created_at: new Date().toISOString(),
    };

    this._BodyDiaryWeeklyServcie.AddBodyDiaryWeekly(this.bodyDiaryWeekly).subscribe({
      next: (res) => {
        console.log(res);
        this.showAlert = true;
      },
      error: (err) => {
        console.error(err);
      },
    });
  } else {
    this.encodeImageToBase64(this.selectedFile).subscribe({
      next: (res) => {
        const base64image = res;

        this.bodyDiaryWeekly = {
          ...this.bodyDiaryWeekly,
          created_at: new Date().toISOString(),
          photo: { photoData: base64image },
        };

        const newsObservable = this._BodyDiaryWeeklyServcie.AddBodyDiaryWeekly(this.bodyDiaryWeekly);

        newsObservable.subscribe({
          next: (res) => {
            console.log(res);
            this.showAlert = true;
          },
          error: (err) => {
            console.error(err);
          },
        });
      },
      error: (err) => console.error(err),
    });
  }
    }



  encodeImageToBase64(file: File): Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();

    reader.onload = (event) =>
      result.next(btoa(event?.target?.result?.toString() || ''));

    reader.readAsBinaryString(file);

    return result;
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;
  }
  openModel(){
    const modelDiv=document.getElementById('myModal');
    if(modelDiv!=null){
      modelDiv.style.display='block';
    }
  }
  closeModel(){
    const modelDiv=document.getElementById('myModal');
    if(modelDiv!=null){
      modelDiv.style.display='none';
    }
  }
}
