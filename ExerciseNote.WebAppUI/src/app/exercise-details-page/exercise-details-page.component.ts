import { Component, OnInit } from '@angular/core';
import { Exercise } from '../models/exercise';
import { ActivatedRoute, Router } from '@angular/router';
import { ExerciseService } from '../service/exercise.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteExerciseComponent } from '../delete-exercise/delete-exercise.component';

@Component({
  selector: 'app-exercise-details-page',
  templateUrl: './exercise-details-page.component.html',
  styleUrl: './exercise-details-page.component.css'
})
export class ExerciseDetailsPageComponent implements OnInit{
  exercise: Exercise=new Exercise();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private exerciseService: ExerciseService,
    private modalService: NgbModal
  ) {}
  ngOnInit(): void {
    
    const id = this.route.snapshot.paramMap.get('id')!;
    this.exerciseService.getExerciseById(id).subscribe({
      next: (res: Exercise) => {
        this.exercise = res;
    },
          error: (err) => console.error(err),
  });
     
  }


  navigateToNews(exerciseId?: string): void {
    this.router.navigateByUrl('/').then(() => {
      this.router.navigate(['', exerciseId]);
    });
  }
  edit() {
   // const exerciseId = this.exercise.id; 
   // this.router.navigate(['exercise', exerciseId, 'edit']);
  }
  openDeleteModal(): void {
    const modalRef = this.modalService.open(DeleteExerciseComponent);

    modalRef.componentInstance.news = this.exercise; 

    modalRef.result.then((result) => {
      
      if (result === 'delete') {
        this.deleteNews();
      }
    });
  }
  deleteNews(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.exerciseService.deleteeExercise(id).subscribe({
      next: (result) => {
        
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['']);
        });
      
      },
      error: (err) => console.error('Error deleting exercise', err),
    });
  }

}
