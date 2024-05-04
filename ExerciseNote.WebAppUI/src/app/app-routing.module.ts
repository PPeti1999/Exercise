import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './shared/components/errors/not-found/not-found.component';
import { PlayComponent } from './play/play.component';
import { AuthorizationGuard } from './shared/guards/authorization.guard';
import { ExerciseDetailsPageComponent } from './exercise-details-page/exercise-details-page.component';
import { CreateExerciseComponent } from './create-exercise/create-exercise.component';
import { DeleteExerciseComponent } from './delete-exercise/delete-exercise.component';
import { CreateBodydiaryComponent } from './create-bodydiary/create-bodydiary.component';

const routes: Routes = [
  { path: '', component: HomeComponent, //canActivate: [AuthGuard]
},

{ path: '', 
runGuardsAndResolvers:'always',
canActivate:[AuthorizationGuard],
children:[// ide kell tenni azokat az elereseket amiket csak belepes utan szabad latni 
{path: 'bodydiary',component: PlayComponent
},
{path: 'create',component: CreateExerciseComponent
},
{path: 'exercise/:id/edit',component: CreateExerciseComponent
},
{path:'createbodydiary',component:CreateBodydiaryComponent}
]
},

{path: 'exercise/:id',component: ExerciseDetailsPageComponent,},
{path: 'account',loadChildren:()=>import('./account/account.module').then(module=>module.AccountModule) },
{ path: 'not-found', component: NotFoundComponent,},
{ path: '**', component: NotFoundComponent,pathMatch:'full'// érvénytelen kérés esetén ezt tölti be 
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
