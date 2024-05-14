import { Component, Input } from '@angular/core';
import { WorkoutPlan } from '../models/workoutPlan';
import { Exercise } from '../models/exercise';
import { ExerciseService } from '../service/exercise.service';

@Component({
  selector: 'app-card-workoutplan',
  templateUrl: './card-workoutplan.component.html',
  styleUrl: './card-workoutplan.component.css'
})
export class CardWorkoutplanComponent {
  selectedCardDataW: any;
  exerciseList: Exercise[];
  @Input() item: WorkoutPlan;
  constructor( private exerciseService :ExerciseService
    )  {}
    ngOnInit(): void {
     
   
     
    }
    openModelW(workoutPlan: any){
      const modelDiv=document.getElementById(`myModalW${workoutPlan.id}`);
      if(modelDiv!=null){
        this.selectedCardDataW = workoutPlan;
        this.exerciseList = []; // Initialize exerciseList here
        if (workoutPlan.exerciseIdList) {
          for (let i = 0; i < workoutPlan.exerciseIdList.length; i++) {
            const exerciseId = workoutPlan.exerciseIdList[i];
            this.getExerciseById(exerciseId);
          }
        }
        modelDiv.style.display='block';
      }
    }
  closeModelW(){
    const modelDiv=document.getElementById(`myModalW${this.selectedCardDataW.id}`);
    if(modelDiv!=null){
      modelDiv.style.display='none';
    }
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
}
