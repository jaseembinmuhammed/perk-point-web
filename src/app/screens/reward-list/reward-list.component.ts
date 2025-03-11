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
import { DeleteRewardComponent } from '../../components/delete-reward/delete-reward.component';
import { UpdateRewardComponent } from '../../components/update-reward/update-reward.component';

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
  readonly deleteRewardDialog = inject(MatDialog);
  readonly updateRewardDialog = inject(MatDialog);

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

  onDelete(item: Reward) {
    const deleteRewardDialogRef = this.deleteRewardDialog.open(
      DeleteRewardComponent,
      { data: item }
    );
    deleteRewardDialogRef.afterClosed().subscribe((result: Reward) => {
      if (result !== undefined && result?.id) {
        console.log('deleted', result);
        const tableData = [...this.dataSource.data];
        let filteredData = tableData.filter((row) => row.id != result.id);
        this.dataSource.data = filteredData;
      }
    });
  }

  onEdit(item: Reward) {
    const updateRewardDialogRef = this.updateRewardDialog.open(
      UpdateRewardComponent,
      { data: item }
    );
    updateRewardDialogRef.afterClosed().subscribe((result: Reward) => {
      if (result !== undefined && result?.id) {
        console.log('updated', result);
        const tableData = [...this.dataSource.data];
        let updatedTableData = tableData.map((row) => {
          if (row.id === result.id) {
            row.name = result.name;
            return row;
          }
          return row;
        });
        this.dataSource.data = updatedTableData;
      }
    });
  }
}
