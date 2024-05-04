import { Component, Input, TemplateRef } from '@angular/core';
import { Exercise } from '../models/exercise';
import { ExerciseService } from '../service/exercise.service';
import { ActivatedRoute } from '@angular/router';
import { ExerciseTypeService } from '../service/exercise-type.service';
import { ExerciseType } from '../models/exerciseType';
import { Observable, ReplaySubject } from 'rxjs';
import { Dialog } from '@angular/cdk/dialog';
import { User } from '../shared/models/account/user';
import { AccountService } from '../account/account.service';
import { BodyDiary } from '../models/bodyDiary';

@Component({
  selector: 'app-create-bodydiary',
  templateUrl: './create-bodydiary.component.html',
  styleUrl: './create-bodydiary.component.css'
})

export class CreateBodydiaryComponent {
  activityOptions: string[] = [
    'Sedentary Lifestyle',
    'Lightly Active',
    'Moderately Active',
    'Highly Active (career athlete or similar)'
  ];
  selectedFile: File | null;
  bodyDiary: BodyDiary = {} as BodyDiary;
  showAlert: boolean = false;
bmr:number;
tsFile:number;
af:number;
afX:number;
tsFileFood:number;
totalDailyNeedCalories:number;

  constructor(
    private dialog: Dialog,
    private exerciseService: ExerciseService,
    private route: ActivatedRoute,
    private exerciseTypeService: ExerciseTypeService,
    public accountService: AccountService
  ) {}

  types: ExerciseType[] = [];

  selectedActivity: string;
  addingExerciseType = false;
  newTypeName: string;
  currentUser: User | null = null;


  ngOnInit(): void {
    //szerkesztéshez
    /*const id = this.route.snapshot.paramMap.get('id')!;

    if (id) {
      this.exerciseService.getExerciseById(id).subscribe({
        next: (res: Exercise) => {
          this.editingExercise = res;
          this.exercise = { ...res };
          this.exercise.created_at = new Date().toString(); // Format endDate for the date input
          this.selectedExerciseName =  ''; 
          console.log(res);
        },
        error: (err) => console.error(err),
      });
    }*/
    this.loadCurrentUser(); // Az aktuális felhasználó betöltése az inicializáláskor

  }  

  loadCurrentUser() {
    this.accountService.user$.subscribe((user: User | null) => {
      this.currentUser = user;
      if (user) {
        console.log('Bejelentkezett felhasználó:', user);
      } else {
        console.log('Nincs bejelentkezett felhasználó.');
      }
    });
  }



 
  createBodyDiary(): void {
      if ( !this.selectedFile) {
        return;
      }
  /*
      if (this.editingExercise && !this.selectedFile) {
        this.exercise = {
          ...this.exercise,
          created_at: new Date().toISOString(),
        };
  
        this.exerciseService.updateExercise(this.exercise).subscribe({
          next: (res) => {
            console.log(res);
            this.showAlert = true;
          },
          error: (err) => {
            console.error(err);
          },
        });
      } else if(this.selectedFile) {
        this.encodeImageToBase64(this.selectedFile).subscribe({
          next: (res) => {
            const base64image = res;
  
            this.exercise = {
              ...this.exercise,
              type: {
                id: undefined,
                name: this.selectedExerciseName,
              },
              created_at: new Date().toISOString(),
              photo: { photoData: base64image },
            };
  
            const newsObservable = this.editingExercise
              ? this.exerciseService.updateExercise(this.exercise)
              : this.exerciseService.createExercise(this.exercise);
  
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
      }*/
      this.calorieCalculator();
      console.log(this.bodyDiary);
    }
  calorieCalculator(){
    this.tsFile= this.bodyDiary.weight*2.20462262*((100-this.bodyDiary.bodyFat)/100);//JO
   // console.log(this.tsFile);
    this.bmr=(this.tsFile*9.8)+370;
    //console.log(this.bmr);
    if(this.selectedActivity=='Sedentary Lifestyle'){
      this.afX=0.2;
    }else if(this.selectedActivity=='Lightly Active'){
      this.afX=0.3;
    }else if(this.selectedActivity=='Moderately Active'){
      this.afX=0.5;
    }
    else {
      this.afX=0.9;
    }
    
    this.af=this.bmr*this.afX;
   // console.log( this.af);
    this.tsFileFood=(this.bmr+this.af)*0.1;
   // console.log(this.tsFileFood);
    this.totalDailyNeedCalories=this.bmr+this.af+this.tsFileFood;
    this.bodyDiary.maintainWeight=this.totalDailyNeedCalories;
    this.bodyDiary.weightLoss=this.totalDailyNeedCalories-500;
    this.bodyDiary.weightGain=this.totalDailyNeedCalories+500;

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
