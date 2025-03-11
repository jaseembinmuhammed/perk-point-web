import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DialogData } from '../add-employee/add-employee.component';
import { EmployeeService } from '../../services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  Employee,
  TransformedEmployeeRewards,
} from '../../model/employee.type';
import { catchError, finalize, throwError } from 'rxjs';

@Component({
  selector: 'app-update-employee',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatProgressBarModule,
    ReactiveFormsModule,
  ],
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.scss',
})
export class UpdateEmployeeComponent {
  //making component Dialog
  readonly dialogRef = inject(MatDialogRef<UpdateEmployeeComponent>);
  readonly data = inject<TransformedEmployeeRewards>(MAT_DIALOG_DATA);
  //made component as Dialog

  loading = false;
  employeeService = inject(EmployeeService);
  private _snackBar = inject(MatSnackBar);

  employeeForm = new FormGroup({
    name: new FormControl(this.data.employeeName, Validators.required),
    department: new FormControl(this.data.department, Validators.required),
    id: new FormControl(this.data.empId, Validators.required),
  });

  onSubmit() {
    if (this.employeeForm.valid) {
      this.loading = true;
      const formData = this.employeeForm.value;
      this.employeeService
        .updateEmployee(formData)
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
        .subscribe((response: Employee) => {
          this._snackBar.open('Employee Details Updated', 'close');
          this.dialogRef.close(response);
        });
    }
  }
}
