import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.getIsAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
