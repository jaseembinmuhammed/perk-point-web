import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthResponse } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const authData = localStorage.getItem('authToken');
    if (authData) {
      let userInfo: AuthResponse = JSON.parse(authData);
      if (userInfo?.principal?.roles?.includes('ADMIN')) {
        this.router.navigate(['/app_layout/employees']);
      } else if (userInfo?.principal?.roles?.includes('EMPLOYEE')) {
        this.router.navigate(['/app_layout/my_rewards']);
      }
      return false;
    }
    return true;
  }
}
