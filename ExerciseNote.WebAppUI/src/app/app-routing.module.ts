import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './shared/components/errors/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent, //canActivate: [AuthGuard]
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
