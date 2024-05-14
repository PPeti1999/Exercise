import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { NgbPaginationModule, NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { PlayComponent } from './play/play.component';
import { JwtInterceptor } from './shared/interceptors/jwt.interceptor';
import { ExerciseDetailsPageComponent } from './exercise-details-page/exercise-details-page.component';
import { DeleteExerciseComponent } from './delete-exercise/delete-exercise.component';
import { CreateExerciseComponent } from './create-exercise/create-exercise.component';
import { CreateBodydiaryComponent } from './create-bodydiary/create-bodydiary.component';
import { HomeBodydiaryComponent } from './home-bodydiary/home-bodydiary.component';
import { CreateBodydiaryweeklyComponent } from './create-bodydiaryweekly/create-bodydiaryweekly.component';
import { ChartModule } from 'primeng/chart';
import { CreateWorkoutplanComponent } from './create-workoutplan/create-workoutplan.component';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CardBodydiaryComponent } from './card-bodydiary/card-bodydiary.component';
import { CardWorkoutplanComponent } from './card-workoutplan/card-workoutplan.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    PlayComponent,
    ExerciseDetailsPageComponent,
    DeleteExerciseComponent,
    CreateExerciseComponent,
    CreateBodydiaryComponent,
    HomeBodydiaryComponent,
    CreateBodydiaryweeklyComponent,
    CreateWorkoutplanComponent,
    CardBodydiaryComponent,
    CardWorkoutplanComponent,
    CardBodydiaryComponent,
    CardWorkoutplanComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule, NgbAlertModule,
    HttpClientModule,
SharedModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatDialogModule,
    ChartModule,
    MatFormFieldModule, MatSelectModule
  ],
  providers: [
    //provideAnimationsAsync()
    {
      provide:HTTP_INTERCEPTORS, useClass:JwtInterceptor,multi:true 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
