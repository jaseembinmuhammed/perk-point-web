import { Component, inject, model, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DialogData } from '../add-employee/add-employee.component';
import {
  KeyValue,
  Reward,
  TransformedEmployeeRewards,
} from '../../model/employee.type';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RewardService } from '../../services/reward.service';
import { catchError, finalize, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-assign-reward',
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
    MatSelectModule,
  ],
  templateUrl: './assign-reward.component.html',
  styleUrl: './assign-reward.component.scss',
})
export class AssignRewardComponent implements OnInit {
  //Making Component as Dialog
  readonly dialogRef = inject(MatDialogRef<AssignRewardComponent>);
  readonly data = inject<TransformedEmployeeRewards>(MAT_DIALOG_DATA);
  //Made Component as Dialog

  rewardService = inject(RewardService);
  private _snackBar = inject(MatSnackBar);

  loginForm = new FormGroup({
    emplyeeName: new FormControl(
      { value: this.data.employeeName, disabled: true },
      Validators.required
    ),
    awardId: new FormControl('', Validators.required),
    employeeId: new FormControl(this.data.empId, Validators.required),
  });

  loading = false;
  rewards = new FormControl('');
  rewardList: any = [];

  onSubmit() {
    this.loading = true;

    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      console.log(formData);
      this.rewardService
        .assignReward(formData)
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
        .subscribe((response) => {
          this._snackBar.open('Reward Assigned Successfully', 'close');
          this.dialogRef.close(response);
        });
    }
  }

  ngOnInit(): void {
    this.rewardService
      .getRewards()
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
      .subscribe((response) => {
        this.rewardList = response;
      });
  }
}

export interface AssignRewardData {
  employeeId: number;
  awardId: number;
  employeeName: string;
}
