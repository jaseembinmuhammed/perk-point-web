import { Component } from '@angular/core';
import { EmployeeListComponent } from '../screens/employee-list/employee-list.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AppBarComponent } from '../component/app-bar/app-bar.component';

@Component({
  selector: 'app-layout',
  imports: [AppBarComponent,MatIconModule,RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
