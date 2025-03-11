import {
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
import {
  AssignRewardResponse,
  Employee,
  TransformedEmployeeRewards,
} from '../../model/employee.type';
import { EmployeeDetailsComponent } from '../../component/employee-details/employee-details.component';
import { AssignRewardComponent } from '../../component/assign-reward/assign-reward.component';
import { DeleteEmployeeComponent } from '../../component/delete-employee/delete-employee.component';

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
  @ViewChild(MatPaginator) paginator!: MatPaginator;
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

  readonly animal = signal('');
  readonly name = model('');
  readonly dialog = inject(MatDialog);
  readonly detailsDialog = inject(MatDialog);
  readonly assignRewardDialog = inject(MatDialog);
  readonly deleteEmployeeDialog = inject(MatDialog);

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

  assignReward(element: TransformedEmployeeRewards): void {
    const assignReawardDialogRef = this.detailsDialog.open(
      AssignRewardComponent,
      { data: element }
    );
    assignReawardDialogRef
      .afterClosed()
      .subscribe((result: AssignRewardResponse) => {
        const awardedEmployeeId = result.employee.id;
        const tableData = [...this.dataSource.data];
        let updatedTableData = tableData.map(
          (row: TransformedEmployeeRewards) => {
            if (row.empId === awardedEmployeeId) {
              row.numberOfRewards += 1;
              row.rewards.push(result.reward);
              return row;
            }
            return row;
          }
        );
        this.dataSource.data = [...updatedTableData];
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      data: { name: this.name(), animal: this.animal() },
    });
    dialogRef.afterClosed().subscribe((result: Employee) => {
      console.log(result, typeof result);
      if (result !== undefined && result?.id) {
        let item: TransformedEmployeeRewards = {
          empId: result.id,
          employeeName: result.name,
          department: result.department,
          email: result.email,
          numberOfRewards: 0,
          rewards: [],
        };
        const updatedData = this.dataSource.data;
        updatedData.push(item);
        this.dataSource.data = [...updatedData];
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

        console.log(JSON.stringify(transformedData[0]));
        this.dataSource = new MatTableDataSource<TransformedEmployeeRewards>(
          transformedData
        );
        this.dataSource.paginator = this.paginator;
      });
  }

  onDelete(item: TransformedEmployeeRewards): void {
    const deleteEmployeeDialogRef = this.deleteEmployeeDialog.open(
      DeleteEmployeeComponent,
      { data: item }
    );
    deleteEmployeeDialogRef
      .afterClosed()
      .subscribe((result: TransformedEmployeeRewards) => {
        console.log(result.empId);
        const tableData = [...this.dataSource.data];
        let filteredData = tableData.filter((row) => row.empId != result.empId);
        this.dataSource.data = filteredData;
      });
  }
}
