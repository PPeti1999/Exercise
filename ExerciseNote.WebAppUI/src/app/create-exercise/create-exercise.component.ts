import { Component, Input, OnInit } from '@angular/core';
import { Exercise } from '../models/exercise';
import { ExerciseService } from '../service/exercise.service';
import { ActivatedRoute } from '@angular/router';
import { ExerciseTypeService } from '../service/exercise-type.service';
import { ExerciseType } from '../models/exerciseType';

@Component({
  selector: 'app-create-exercise',
  templateUrl: './create-exercise.component.html',
  styleUrl: './create-exercise.component.css'
})
export class CreateExerciseComponent implements OnInit  {
  @Input() editingExercise: Exercise | null = null;

  selectedFile: File | null;
  exercise: Exercise = {} as Exercise;
  showAlert: boolean = false;

  constructor(
    private exerciseService: ExerciseService,
    private route: ActivatedRoute,
    private exerciseTypeService: ExerciseTypeService
  ) {}
  types: ExerciseType[] = [];

  selectedExerciseName: string;
  addingExerciseType = false;
  newTypeName: string;
  ngOnInit(): void {
    this.loadTypes();
    const id = this.route.snapshot.paramMap.get('id')!;

    if (id) {
      this.exerciseService.getExerciseById(id).subscribe({
        next: (res: Exercise) => {
          this.editingExercise = res;
          this.exercise = { ...res };
          this.exercise.created_At = new Date().toString(); // Format endDate for the date input
          this.selectedExerciseName = res.type.name ?? ''; 
          console.log(res);
        },
        error: (err) => console.error(err),
      });
    }
  }
  loadTypes() {
    this.exerciseTypeService.getType().subscribe({
      next: (res) => {
        this.types = res;
        console.log(res);
      },
      error: (err) => console.error(err),
    });
  }
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;
  }


  createOrUpdateExercise(): void {
    if (!this.editingExercise && !this.selectedFile) {
      return;
    }

    if (this.editingExercise && !this.selectedFile) {
      
      this.exercise = {
        ...this.exercise,
        type: {
          id: undefined,
          name: this.selectedExerciseName,
        },
        created_At: new Date().toString(),
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
     
/*
          this.exercise = {
            ...this.exercise,
            this: {
              id: undefined,
              name: this.selectedExerciseName,
            },
            created_At: new Date().toISOString(),
            photo: { id: undefined,photoData: "nem tudom " },
          };
*/
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
      
    }
  }







  addType() {
    let type = {
      name: this.newTypeName,
    } as ExerciseType;

    this.exerciseTypeService.addExerciseType(type).subscribe({
      next: (res) => {
        this.loadTypes();
      },
      error: (err) => console.error(err),
    });
  }
}
