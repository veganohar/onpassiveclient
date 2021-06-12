import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeComponent } from './employee/employee.component';
import { ChartsModule } from 'ng2-charts';
import {TableModule} from 'primeng/table';
import {PaginatorModule} from 'primeng/paginator';
import {ToastModule} from 'primeng/toast';

@NgModule({
  declarations: [
    UsersComponent,
    DashboardComponent,
    EmployeeComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    TableModule,
    PaginatorModule,
    ToastModule
  ]
})
export class UsersModule { }
