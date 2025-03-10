import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-app-bar',
  imports: [MatIconModule,MatTooltipModule,RouterLink,RouterLinkActive],
  templateUrl: './app-bar.component.html',
  styleUrl: './app-bar.component.scss'
})
export class AppBarComponent {
   constructor(private router:Router){}

   onLogout(){
    this.router.navigate(['/login']);
   }
}
