import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './screen/login/login.component';
import { RootComponent } from './root/root.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,LoginComponent,RootComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Bismillah';
}
