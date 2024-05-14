import { Component, Input } from '@angular/core';
import { BodyDiaryWeekly } from '../models/bodyDiaryWeekly';
import { AccountService } from '../account/account.service';
import { WorkoutplanService } from '../service/workoutplan.service';
import { BodydiaryweeklyService } from '../service/bodydiaryweekly.service';
import { HomeBodydiaryService } from '../service/home-bodydiary.service';

@Component({
  selector: 'app-card-bodydiary',
  templateUrl: './card-bodydiary.component.html',
  styleUrl: './card-bodydiary.component.css'
})
export class CardBodydiaryComponent {
   modelDiv: any;
  selectedCardData: any;
  @Input() item: BodyDiaryWeekly;
  constructor(private _workoutPlanService:WorkoutplanService, private _BodydiaryweeklyService:BodydiaryweeklyService,private _homeBodyDiaryService: HomeBodydiaryService, public _accountService: AccountService
    )  {  }
  ngOnInit(): void {
   // console.log("blaba",this.item );
  }
  openModel(bodyDaryWeekly: any){
    const modelDiv=document.getElementById(`myModal${bodyDaryWeekly.id}`);
    if(modelDiv != null){
      if (bodyDaryWeekly instanceof BodyDiaryWeekly) {
        console.log('example változó típusa string.');
      }
     
      console.log("aktuális item", this.item );
      console.log("aktuális bodyDaryWeekly", bodyDaryWeekly );
      this.selectedCardData = <BodyDiaryWeekly>this.item; // Módosítottuk itt
      console.log("selected", this.selectedCardData );
      modelDiv.style.display='block';
    }
  }
  closeModel(){
    const modelDiv=document.getElementById(`myModal${this.selectedCardData.id}`);
    if(modelDiv!=null){
      modelDiv.style.display='none';
    }
    this.selectedCardData=null;
  }
}
