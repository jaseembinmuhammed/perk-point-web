import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthResponse } from '../../services/auth.service';

@Component({
  selector: 'app-app-bar',
  imports: [MatIconModule, MatTooltipModule, RouterLink, RouterLinkActive],
  templateUrl: './app-bar.component.html',
  styleUrl: './app-bar.component.scss',
})
export class AppBarComponent implements OnInit {
  constructor(private router: Router) {}

  showAdminMenu = false;
  showEmployeeMenu = false;

  onLogout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/']);
  }

  openSwagger() {
    window.open(
      'http://localhost:8080/perkpoint/api/swagger-ui/index.html#/',
      '_blank'
    );
  }

  ngOnInit(): void {
    const authData = localStorage.getItem('authToken');
    if (authData) {
      let userInfo: AuthResponse = JSON.parse(authData);
      if (userInfo?.principal?.roles?.includes('ADMIN')) {
        this.showAdminMenu = true;
      } else if (userInfo?.principal?.roles?.includes('EMPLOYEE')) {
        this.showEmployeeMenu = true;
      }
    }
  }
}
