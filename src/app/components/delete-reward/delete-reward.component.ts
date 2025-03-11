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
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { catchError, finalize, throwError } from 'rxjs';

@Component({
  selector: 'app-delete-reward',
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatProgressBarModule,
  ],
  templateUrl: './delete-reward.component.html',
  styleUrl: './delete-reward.component.scss',
})
export class DeleteRewardComponent {
  //Making Component as Dialog
  readonly dialogRef = inject(MatDialogRef<DeleteRewardComponent>);
  readonly data = inject<Reward>(MAT_DIALOG_DATA);
  //Made Component as Dialog

  rewardService = inject(RewardService);
  loading = false;
  private _snackBar = inject(MatSnackBar);

  onDelete() {
    this.loading = true;
    this.rewardService
      .deleteReward(this.data.id)
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
