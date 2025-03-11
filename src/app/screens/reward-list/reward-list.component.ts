import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Reward, TransformedEmployeeRewards } from '../../model/employee.type';
import { RewardService } from '../../services/reward.service';
import { catchError, finalize, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CreateRewardComponent } from '../../component/create-reward/create-reward.component';

@Component({
  selector: 'app-reward-list',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './reward-list.component.html',
  styleUrl: './reward-list.component.scss',
})
export class RewardListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<Reward>([]);
  displayedColumns: string[] = ['rewardName', 'createdOn', 'delete', 'edit'];
  private _snackBar = inject(MatSnackBar);

  readonly creareRewardDialog = inject(MatDialog);
  rewardService = inject(RewardService);
  loading = false;

  ngOnInit(): void {
    this.rewardService
      .getRewardsWithDetails()
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
      .subscribe((list: Reward[]) => {
        this.dataSource = new MatTableDataSource<Reward>(list);
        this.dataSource.paginator = this.paginator;
      });
  }

  createReward(): void {
    const creareRewardDialogRef = this.creareRewardDialog.open(
      CreateRewardComponent
    );
    creareRewardDialogRef.afterClosed().subscribe((result: Reward) => {
      if (result !== undefined && result?.id) {
        const updatedData = this.dataSource.data;
        updatedData.push(result);
        this.dataSource.data = [...updatedData];
      }
    });
  }

  onDelete(item: Reward) {}

  onEdit(item: Reward) {}
}
