import { Component } from '@angular/core';
import { BodyDiary } from '../models/bodyDiary';
import { HomeBodydiaryService } from '../service/home-bodydiary.service';
import { User } from '../shared/models/account/user';
import { AccountService } from '../account/account.service';
import { BodyDiaryWeekly } from '../models/bodyDiaryWeekly';
import { BodydiaryweeklyService } from '../service/bodydiaryweekly.service';
import { WorkoutPlan } from '../models/workoutPlan';
import { WorkoutplanService } from '../service/workoutplan.service';
import { ExerciseService } from '../service/exercise.service';
import { Exercise } from '../models/exercise';
import { Pipe, PipeTransform } from '@angular/core';
@Component({
  selector: 'app-home-bodydiary',
  templateUrl: './home-bodydiary.component.html',
  styleUrl: './home-bodydiary.component.css'
})
export class HomeBodydiaryComponent {
  isLoading: Boolean = true; // Flag to track loading state
  exercise: Exercise=new Exercise();
  exerciseList: Exercise[];
  bodyDiary: BodyDiary;
  currentUser: User | null = null;
  bodyDaryWeeklyList: BodyDiaryWeekly[];
  workouPlanList: WorkoutPlan[];
  data: any;
  chartData: any;
  selectedCardData: any;
  selectedCardDataW: any;
displayModal: boolean = false;
allItems: (BodyDiaryWeekly | WorkoutPlan)[] = []; // Ebben a listában tároljuk az összes elemet

constructor(private exerciseService :ExerciseService, private _workoutPlanService:WorkoutplanService, private _BodydiaryweeklyService:BodydiaryweeklyService,private _homeBodyDiaryService: HomeBodydiaryService, public _accountService: AccountService
  )  {}
    ngOnInit(): void {
      this.loadCurrentUser();
      this.GetLastBodyDiary(this.currentUser);
     
    }

    openModel(bodyDaryWeekly: any){
      const modelDiv=document.getElementById('myModal');
      if(modelDiv!=null){

        if (bodyDaryWeekly instanceof BodyDiaryWeekly) {
          console.log('example változó típusa string.');
        }

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

    getAllItems() {
      this.allItems = [...this.bodyDaryWeeklyList, ...this.workouPlanList];
      this.allItems.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

    }
    
    openModelW(workoutPlan: any){
      const modelDiv=document.getElementById('myModalW');
     // this.getExerciseById()
      if(modelDiv!=null){
        this.selectedCardDataW = workoutPlan;
        if (workoutPlan.exerciseIdList) {
          for (let i = 0; i <workoutPlan.exerciseIdList.length; i++) {
            const exerciseId = workoutPlan.exerciseIdList[i];
            this.exerciseList=[];

            this.getExerciseById(exerciseId);
           
          }
        }
        this.getExerciseById(workoutPlan.id)
        modelDiv.style.display='block';
      }
    }
    closeModelW(){
      const modelDiv=document.getElementById('myModalW');
      if(modelDiv!=null){
        modelDiv.style.display='none';
      }
    }
    getImageSrc(item: BodyDiaryWeekly | WorkoutPlan): string {
      if (item instanceof BodyDiaryWeekly) {
        // Ha a tétel egy BodyDiaryWeekly, akkor visszaadjuk a kép adatát
        
        return `data:image/png;base64,${item.photo.photoData}`;
      } else if (item instanceof WorkoutPlan) {
        // Ha a tétel egy WorkoutPlan, akkor visszaadjuk a megfelelő kép elérési útját
        return "./assets/images/weekly-workout-schedule.png";
      }
      return ""; // Alapértelmezett érték, ha az elem nem tartalmaz képet
    } 
    getExerciseById(id: string){

      this.exerciseService.getExerciseById(id).subscribe({
        next: (res: Exercise) => {
          this.exerciseList.push(res);
          console.log(res);
      },
            error: (err) => console.error(err),
    });
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
  ListActualWorkoutPlan(){
   
    this._workoutPlanService.ListActualWorkoutPlan(this.bodyDiary.id).subscribe({
      next: (res: WorkoutPlan[]) => { 
        this.workouPlanList = res;
        console.log("aktuális workoutplan LIST:",this.workouPlanList)


        this.getAllItems(); // Az összes elem összegyűjtése és rendezése
      //  console.log("all items:",allItems)
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
      this.ListActualWorkoutPlan();
      this.isLoading = false; // Set loading flag to false in case of error
    
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
