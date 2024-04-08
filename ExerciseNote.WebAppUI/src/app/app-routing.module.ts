import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './shared/components/errors/not-found/not-found.component';
import { PlayComponent } from './play/play.component';
import { AuthorizationGuard } from './shared/guards/authorization.guard';
import { ExerciseDetailsPageComponent } from './exercise-details-page/exercise-details-page.component';
import { CreateExerciseComponent } from './create-exercise/create-exercise.component';

const routes: Routes = [
  { path: '', component: HomeComponent, //canActivate: [AuthGuard]
},

{ path: '', 
runGuardsAndResolvers:'always',
canActivate:[AuthorizationGuard],
children:[// ide kell tenni azokat az elereseket amiket csak belepes utan szabad latni 


  {path: 'play',component: PlayComponent
},
]
},
{
  path: 'create',
  component: CreateExerciseComponent
 // canActivate: [AdminGuard]
},

{
  path: ':id',
  component: ExerciseDetailsPageComponent,
},
{
  path: ':id/edit',
  component: CreateExerciseComponent
},
{path: 'account',loadChildren:()=>import('./account/account.module').then(module=>module.AccountModule) 
 // canActivate: [AdminGuard]
},
{ path: 'not-found', component: NotFoundComponent, //canActivate: [AuthGuard]
},
{ path: '**', component: NotFoundComponent,pathMatch:'full' //canActivate: [AuthGuard]
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
