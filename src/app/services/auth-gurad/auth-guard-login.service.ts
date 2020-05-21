import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class CanActivateViaAuthGuardForLogin implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    // return this.authService.isLoggedIn();
    if (!this.authService.isLoggedIn()) {
        return true
    } else {
        this.router.navigate(['/dashboard']);
        return false;
    }
  }
}