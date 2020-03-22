import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatSidenavModule, MatDividerModule, MatCardModule} from '@angular/material'; 
import { LightMeasurementComponent } from 'src/app/light-measurement/light-measurement.component';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    LightMeasurementComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    FlexLayoutModule,
    MatCardModule
  ]
})
export class DefaultModule { }
