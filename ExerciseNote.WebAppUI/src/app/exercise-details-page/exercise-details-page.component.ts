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
/*
htmL:
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="generator" content="Hugo 0.84.0">
  
    <!-- Bootstrap core CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css" rel="stylesheet">
  
    <!-- Font Awesome CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" integrity="sha512-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" crossorigin="anonymous" />
  
    <!-- Custom styles for this template -->
    <link href="news-details-page.component.css" rel="stylesheet">
  </head>
<body>

  <div class="container mt-5">
    <div class="row">
        <div class="col-lg-8">
            <!-- Post content-->
            <article>
                <header class="mb-4">
                    <!-- Post title with larger font size -->
                    <h1 class="fw-bolder mb-1" style="font-size: xx-large;">
                        {{ exercise.title }}
                        <!-- Big yellow star icon -->
                        <!-- SVG csillag ikon -->
                       
                    </h1>
                    <!-- Post meta content-->
                    <div class="text-muted fst-italic mb-2">Posted on {{ exercise.created_At| date:'yyyy-MM-dd' }}</div>
                    
                    <!-- Post categories-->
                    
                    <a *ngIf="exercise?.type?.name" class="badge bg-secondary text-decoration-none link-light" >{{ exercise.type.name }}</a>
                </header>
            </article>
        </div>
    </div>
</div>


<main class="container-fluid">
  <div class="row g-5">
    <div class="col-md-8">
      <h3 class="pb-4 mb-4 fst-italic border-bottom">
        <div class="news-image">
          <img src="{{ exercise.photo.photoData }}" alt="{{ exercise.title }}" class="img-fluid" />
        </div>
      </h3>

      <article class="blog-post">
    
        <div class="news-description">
          <p class="text-break">{{ exercise.body }}</p>
        </div>
      </article>

      <nav class="blog-pagination" aria-label="Pagination">
        <a class="btn btn-danger"  (click)="openDeleteModal()" tabindex="-1" aria-disabled="true">Delete</a>
        <a class="btn btn-danger"  (click)="edit()" tabindex="-1" aria-disabled="true">Edit</a>
      </nav>
    </div>

   
  </div>
</main>


<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>

*/