import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

    router;
  title = 'ExerciseNote.WebAppUI';
  constructor(router : Router){
    this.router = router;

}
}
