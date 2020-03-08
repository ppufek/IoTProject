import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LandingComponent } from './landing/landing.component';
<<<<<<< HEAD
=======

>>>>>>> 9512795a35de78f4614356a8428c4c1ec9b120fd


const routes: Routes = [ 
  {path: '', component: LandingComponent },
  {path: 'dominik', component: LoginComponent },
<<<<<<< HEAD
  {path: 'paula', component: DashboardComponent}];
=======
  {path: 'paula', component: DashboardComponent}
];
>>>>>>> 9512795a35de78f4614356a8428c4c1ec9b120fd

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
