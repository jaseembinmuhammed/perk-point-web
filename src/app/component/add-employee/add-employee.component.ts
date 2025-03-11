import { Component, inject, model } from '@angular/core';
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
import { Employee, Reward } from '../../model/employee.type';
import { EmployeeService } from '../../services/employee.service';
import { catchError, finalize, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-employee',
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
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss',
})
export class AddEmployeeComponent {
  readonly dialogRef = inject(MatDialogRef<AddEmployeeComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly animal = model(this.data.animal);
  loading = false;
  employeeService = inject(EmployeeService);
  private _snackBar = inject(MatSnackBar);

  employeeForm = new FormGroup({
    name: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    mail: new FormControl('', Validators.required),
  });

  onSubmit(): void {
    if (this.employeeForm.valid) {
      this.loading = true;
      const formData = this.employeeForm.value;

      this.employeeService
        .createEmployee(formData)
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
          this.dialogRef.close(response);
        });
    }
  }
}

export interface DialogData {
  animal: string;
  name: string;
  email: string;
  rewards: Reward[];
}
