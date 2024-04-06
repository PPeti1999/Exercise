import { Component } from '@angular/core';
import { Exercise } from '../models/exercise';
import { ExerciseService } from '../service/exercise.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  exerciseList: Exercise[];
  constructor(private _exerciseService: ExerciseService
    ) {}
    ngOnInit(): void {
      this.getAllExercise();
    }
    getAllExercise():void{
      this._exerciseService.getExercise() .subscribe({
        next: (res: Exercise[]) => (this.exerciseList = res),
        error: (err) => console.error(err),
      });
    }

}
