import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isAuthenticated = !!localStorage.getItem('authToken');

    if (isAuthenticated) {
      this.router.navigate(['/']); // Redirect to home (or dashboard) if already logged in
      return false;
    }
    return true;
  }
}
