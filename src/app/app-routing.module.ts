import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LandingComponent } from './landing/landing.component';
import { DefaultComponent } from './layouts/default/default.component';
import { LightMeasurementComponent } from './light-measurement/light-measurement.component';


const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'dominik', component: LoginComponent },
  {
    path: '', component: DefaultComponent,
    children: [{
      path: 'dominik/dashboard',
      component: DashboardComponent
    },
    {
      path: 'light-measurement',
      component: LightMeasurementComponent

    }]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
