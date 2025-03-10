import { Component } from '@angular/core';
import { EmployeeListComponent } from '../screens/employee-list/employee-list.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'root',
  imports: [EmployeeListComponent,MatIconModule],
  templateUrl: './root.component.html',
  styleUrl: './root.component.scss'
})
export class RootComponent {

}
