import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Reward } from '../../model/employee.type';
import { RewardService } from '../../services/reward.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { catchError, finalize, throwError } from 'rxjs';

@Component({
  selector: 'app-create-reward',
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
  templateUrl: './create-reward.component.html',
  styleUrl: './create-reward.component.scss',
})
export class CreateRewardComponent {
  //Making Component as Dialog
  readonly dialogRef = inject(MatDialogRef<CreateRewardComponent>);
  readonly data = inject<Reward>(MAT_DIALOG_DATA);
  //Made Component as Dialog

  rewardService = inject(RewardService);
  private _snackBar = inject(MatSnackBar);

  rewardForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  loading = false;

  onSubmit() {
    if (this.rewardForm.valid) {
      this.loading = true;
      const formData = this.rewardForm.value;
      console.log(formData);
      this.rewardService
        .createReward(formData)
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
          this._snackBar.open('Reward Created Successfully', 'close');
          this.dialogRef.close(response);
        });
    }
  }
}
