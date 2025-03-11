import {
  AfterViewInit,
  Component,
  inject,
  model,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EmployeeService } from '../../services/employee.service';
import { catchError, of } from 'rxjs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../../component/add-employee/add-employee.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { TransformedEmployeeRewards } from '../../model/employee.type';
import { EmployeeDetailsComponent } from '../../component/employee-details/employee-details.component';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-employee-list',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
})
export class EmployeeListComponent implements OnInit {
  employeeService = inject(EmployeeService);
  displayedColumns: string[] = [
    'employeeName',
    'department',
    'email',
    'numberOfRewards',
    'details',
    'action',
  ];
  dataSource = new MatTableDataSource<TransformedEmployeeRewards>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  readonly animal = signal('');
  readonly name = model('');
  readonly dialog = inject(MatDialog);
  readonly detailsDialog = inject(MatDialog);

  showDetails(item: TransformedEmployeeRewards): void {
    const detailsDialogRef = this.detailsDialog.open(EmployeeDetailsComponent, {
      data: {
        name: item.employeeName,
        email: item.email,
        rewards: item.rewards,
      },
    });
    detailsDialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      if (result !== undefined) {
        console.log(result);
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      data: { name: this.name(), animal: this.animal() },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      if (result !== undefined) {
        this.animal.set(result);
      }
    });
  }

  ngOnInit(): void {
    this.employeeService
      .getEmployeeList()
      .pipe(
        catchError((err) => {
          console.log(err);
          return of([]);
        })
      )
      .subscribe((list) => {
        let transformedData: TransformedEmployeeRewards[] =
          this.employeeService.TransformData(list);
        this.dataSource = new MatTableDataSource<TransformedEmployeeRewards>(
          transformedData
        );
        this.dataSource.paginator = this.paginator;
      });
  }
}

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
  { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
  { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
  { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
  { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
  { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
  { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
  { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
  { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
  { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
];
