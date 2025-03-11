import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './screens/login/login.component';
import { RootComponent } from './root/root.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Bismillah';
}

// http://localhost:8080/perkpoint/api/swagger-ui/index.html#/
