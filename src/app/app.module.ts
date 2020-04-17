import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { DefaultModule } from './layouts/default/default.module';
import { AuthGuardService } from './auth-guard.service';
import { MatDividerModule, MatToolbarModule, MatIconModule, MatListModule, MatMenuModule, MatButtonModule } from '@angular/material';






registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    DefaultModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule, 
    MatListModule,
    
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }