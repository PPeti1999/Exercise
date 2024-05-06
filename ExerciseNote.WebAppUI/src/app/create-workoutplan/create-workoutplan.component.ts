import { Component } from '@angular/core';
import { User } from '../shared/models/account/user';
import { WorkoutPlan } from '../models/workoutPlan';
import { BodyDiary } from '../models/bodyDiary';
import { AccountService } from '../account/account.service';
import { HomeBodydiaryService } from '../service/home-bodydiary.service';
import { WorkoutplanService } from '../service/workoutplan.service';
import { Exercise } from '../models/exercise';
import { ExerciseService } from '../service/exercise.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-workoutplan',
  templateUrl: './create-workoutplan.component.html',
  styleUrl: './create-workoutplan.component.css'
})
export class CreateWorkoutplanComponent {
  selectedExercisesControl = new FormControl([]);

  workoutPlan: WorkoutPlan = {} as WorkoutPlan;
  showAlert: boolean = false;
  bodyDiary: BodyDiary;
  currentUser: User | null = null;
  selectedExerciseIds: number[] = []; // Tömb a kiválasztott gyakorlatok azonosítóinak tárolására

  exercises: Exercise[] = []; // Tömb a gyakorlatok tárolására
  
  constructor(private _homeBodyDiaryService: HomeBodydiaryService, public _accountService: AccountService,
    private _workoutPlanService:WorkoutplanService,
    private _exerciseService: ExerciseService // ExerciseService injektálása
    ) {}
  ngOnInit(): void {
    this.loadCurrentUser();
    this.GetLastBodyDiary(this.currentUser);
    this.getExercises(); // Gyakorlatok betöltése az inicializáláskor
  }  
  getExercises(): void {
    this._exerciseService.getExercise().subscribe({
      next: (exercises: Exercise[]) => {
        this.exercises = exercises;
      },
      error: (err) => {
        console.error(err);
      }
    });
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



 
  createWorkoutPlan(): void {
   
    this.workoutPlan.idBodyDairy=this.bodyDiary.id.toString();
    this.workoutPlan.created_at = new Date().toISOString();
    this.workoutPlan.burnedCalories=(this.bodyDiary.weight/200)*3.5*10;

  // Kiválasztott gyakorlatok azonosítóinak hozzáadása a workoutPlan exerciseIdList tömbjéhez
console.log (this.selectedExercisesControl)
    //this.workoutPlan.exerciseIdList = this.selectedExercisesControl.map(id => id.toString());




	  const newsObservable = this._workoutPlanService.AddWrokoutPlan(this.workoutPlan);

   newsObservable.subscribe({
    next: (res) => {
      console.log(res);
      this.showAlert = true;
    },
    error: (err) => {
      console.error(err);
    },
    });
    }
  
}