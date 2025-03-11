import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { TransformedEmployeeRewards } from '../../model/employee.type';
import { MatButtonModule } from '@angular/material/button';
import { EmployeeService } from '../../services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, finalize, throwError } from 'rxjs';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-delete-employee',
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatProgressBarModule,
  ],
  templateUrl: './delete-employee.component.html',
  styleUrl: './delete-employee.component.scss',
})
export class DeleteEmployeeComponent {
  //Making Component as Dialog
  readonly dialogRef = inject(MatDialogRef<DeleteEmployeeComponent>);
  readonly data = inject<TransformedEmployeeRewards>(MAT_DIALOG_DATA);
  //Made Component as Dialog

  employeeService = inject(EmployeeService);
  loading = false;
  private _snackBar = inject(MatSnackBar);

  onDelete() {
    this.loading = true;
    this.employeeService
      .deleteEmployee(this.data.empId)
      .pipe(
        catchError((err) => {
          console.log(err);
          let errorMessage = 'Something Went Wrong';
          if (err.error && err.error.message) {
            errorMessage = err.error.message;
          } else if (err.message) {
            errorMessage = err.message;
          }
          this._snackBar.open(errorMessage, 'close');
          return throwError(() => new Error(errorMessage));
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(() => {
        this._snackBar.open('Employee Deleted...', 'close');
        this.dialogRef.close(this.data);
      });
  }
}
