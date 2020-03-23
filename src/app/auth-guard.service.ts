import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { SharedService } from './shared.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private sharedService:SharedService, public router: Router) {}
  canActivate(): boolean {
    if (!this.sharedService.isLoggedIn()) {
      this.router.navigate(['dominik']);
      return false;
    }
    return true;
  }
}