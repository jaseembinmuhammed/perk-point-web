import { Component, inject, OnInit } from '@angular/core';
import { RewardService } from '../../services/reward.service';
import { Reward } from '../../model/employee.type';
import { catchError, finalize, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-reward',
  imports: [CommonModule],
  templateUrl: './my-reward.component.html',
  styleUrl: './my-reward.component.scss',
})
export class MyRewardComponent implements OnInit {
  rewardService = inject(RewardService);
  rewardList: Reward[] = [];
  loading = false;
  private _snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.rewardService
      .getMyRewards()
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
