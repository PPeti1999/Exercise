import { Component, Input } from '@angular/core';
import { Exercise } from '../models/exercise';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-exercise',
  templateUrl: './delete-exercise.component.html',
  styleUrl: './delete-exercise.component.css'
})
export class DeleteExerciseComponent {
  @Input() exercise: Exercise;

  constructor(public activeModal: NgbActiveModal) {}

  confirmDelete(): void {
    
    this.activeModal.close('delete');
  }

  cancelDelete(): void {
    this.activeModal.dismiss('cancel');
  }
}
