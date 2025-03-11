import { Routes } from '@angular/router';
import { LoginComponent } from './screens/login/login.component';
import { RootComponent } from './root/root.component';
import { LayoutComponent } from './layout/layout.component';
import { EmployeeListComponent } from './screens/employee-list/employee-list.component';
import { RewardListComponent } from './screens/reward-list/reward-list.component';
import { AuthGuard } from './guard/auth.guard';
import { LoginGuard } from './guard/login.guard';
import { MyRewardComponent } from './screens/my-reward/my-reward.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'app_layout',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'employees',
        component: EmployeeListComponent,
      },
      {
        path: 'rewards',
        component: RewardListComponent,
      },
      {
        path: 'my_rewards',
        component: MyRewardComponent,
      },
    ],
  },
];
