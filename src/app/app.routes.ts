import { Routes } from '@angular/router';
import { LoginComponent } from './screen/login/login.component';
import { RootComponent } from './root/root.component';
import { LayoutComponent } from './layout/layout.component';
import { EmployeeListComponent } from './screens/employee-list/employee-list.component';
import { RewardListComponent } from './screens/reward-list/reward-list.component';

export const routes: Routes = [
    {
        path:"",
        component:LayoutComponent,
        children:[
            {
                path:"employees",
                component:EmployeeListComponent
            },
            {
                path:"rewards",
                component:RewardListComponent
            }
        ]
    },
    {
        path:"login",
        component:LoginComponent
    }
    
];
