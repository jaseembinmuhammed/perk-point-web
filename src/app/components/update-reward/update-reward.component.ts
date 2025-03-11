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
import { catchError, finalize, throwError } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-update-reward',
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
  templateUrl: './update-reward.component.html',
  styleUrl: './update-reward.component.scss',
})
export class UpdateRewardComponent {
  //Making Component as Dialog
  readonly dialogRef = inject(MatDialogRef<UpdateRewardComponent>);
  readonly data = inject<Reward>(MAT_DIALOG_DATA);
  //Made Component as Dialog

  rewardService = inject(RewardService);
  private _snackBar = inject(MatSnackBar);

  rewardForm = new FormGroup({
    name: new FormControl(this.data.name, Validators.required),
    id: new FormControl(this.data.id, Validators.required),
  });

  loading = false;

  onSubmit() {
    if (this.rewardForm.valid) {
      this.loading = true;
      const formData = this.rewardForm.value;
      console.log(formData);
      this.rewardService
        .updateReward(formData)
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
          this._snackBar.open('Reward Updated Successfully', 'close');
          this.dialogRef.close(response);
        });
    }
  }
}
