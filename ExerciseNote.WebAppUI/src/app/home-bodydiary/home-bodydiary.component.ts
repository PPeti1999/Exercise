import { Component, ComponentFactory, ComponentFactoryResolver, EventEmitter, Injector, Output } from '@angular/core';
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
import { CardBodydiaryComponent } from '../card-bodydiary/card-bodydiary.component';
import { CardWorkoutplanComponent } from '../card-workoutplan/card-workoutplan.component';
@Component({
  selector: 'app-home-bodydiary',
  templateUrl: './home-bodydiary.component.html',
  styleUrl: './home-bodydiary.component.css'
})
export class HomeBodydiaryComponent {
  @Output() someEvent = new EventEmitter<any>();
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

sendDataToChild() {
  const data = { /* Some data */ };
  this.someEvent.emit(data);
}
handleChildEvent(data: any) {
  // Kezelje itt a gyermekkomponens eseményét és az átadott adatokat
  console.log('Received data from child:', data);
}

allItems: (BodyDiaryWeekly | WorkoutPlan)[] = []; // Az összes elem tömbje


constructor(private resolver: ComponentFactoryResolver, public injector: Injector, private exerciseService :ExerciseService, private _workoutPlanService:WorkoutplanService, private _BodydiaryweeklyService:BodydiaryweeklyService,private _homeBodyDiaryService: HomeBodydiaryService, public _accountService: AccountService
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
      
        console.log("aktuális bodyDaryWeekly", bodyDaryWeekly );
        this.selectedCardData = bodyDaryWeekly; // Módosítottuk itt
        console.log("selected", this.selectedCardData );
        modelDiv.style.display='block';
      }
    }
    closeModel(){
      const modelDiv=document.getElementById('myModal');
      if(modelDiv!=null){
        modelDiv.style.display='none';
      }
    }
    isBodyDiaryWeekly(item: any): item is BodyDiaryWeekly {
     // console.log(item);
    //console.log(item instanceof BodyDiaryWeekly);
    return typeof item === 'object' && item !== null && 'weight' in item;
      return item instanceof BodyDiaryWeekly;
    }
  
    isWorkoutPlan(item: any): item is WorkoutPlan {
     // console.log(item instanceof WorkoutPlan);
     // return item instanceof WorkoutPlan;
      return typeof item === 'object' && item !== null && 'burnedCalories' in item;
    }
  /*  isBodyDiaryWeekly(item: any): boolean {
      return typeof item === 'object' && item !== null && 'weight' in item;
    }
    
    isWorkoutPlan(item: any): boolean {
      return typeof item === 'object' && item !== null && 'burnedCalories' in item;
    }*/
    getAllItems() {
      // Feltételes ellenőrzés, hogy a listák nem null értékűek-e
      if (this.bodyDaryWeeklyList && this.workouPlanList) {
        // Ha mindkét lista létezik, akkor rendezzük őket és összefűzzük
        this.allItems = [...this.bodyDaryWeeklyList, ...this.workouPlanList];
      } else if (this.bodyDaryWeeklyList) {
        // Ha csak a bodyDaryWeeklyList létezik, akkor csak azt használjuk
        this.allItems = this.bodyDaryWeeklyList;
      } else if (this.workouPlanList) {
        // Ha csak a workouPlanList létezik, akkor csak azt használjuk
        this.allItems = this.workouPlanList;
      } else {
        // Ha egyik lista sem létezik, akkor üres listát állítunk be
        this.allItems = [];
      }
    
      // Csak akkor rendezzük, ha van mit rendezni
      if (this.allItems.length > 0) {
        this.allItems.sort((a, b) => {
          const dateA = new Date(a.created_at).getTime();
          const dateB = new Date(b.created_at).getTime();
          return dateA - dateB;
        });
      }
    }
    
    getComponentType(item: any): any {
      return item instanceof BodyDiaryWeekly ? CardBodydiaryComponent : CardWorkoutplanComponent;
    }
    createComponentFactory(componentType: any): ComponentFactory<any> {
      return this.resolver.resolveComponentFactory(componentType);
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
      
          
          this.getAllItems(); // Az összes elem összegyűjtése és rendezése
          console.log(this.allItems);
          

        },
        error: (err) => console.error(err),
      });
    
  }
  ListActualWorkoutPlan(){
   
    this._workoutPlanService.ListActualWorkoutPlan(this.bodyDiary.id).subscribe({
      next: (res: WorkoutPlan[]) => { 
        this.workouPlanList = res;
        console.log("aktuális workoutplan LIST:",this.workouPlanList)

       
       
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
      if (res) {
        this.bodyDiary = res;
        this.ListActualBodyDiaryWeekly();
        this.ListActualWorkoutPlan();
        this.isLoading = false; // Set loading flag to false in case of error
    } else {
        console.log('No Body Diary found.');
        // Set isLoading to false here if needed
    }
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
