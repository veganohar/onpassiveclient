import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeComponent } from './employee/employee.component';
import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path: '', component: UsersComponent, children: [
      {path:'',redirectTo:'dashboard',pathMatch:'full'},
      { path: 'dashboard', component: DashboardComponent },
      { path: 'create-employee', component: EmployeeComponent },
      { path: 'edit-employee/:eid', component: EmployeeComponent }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
