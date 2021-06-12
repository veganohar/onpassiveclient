import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'reset-password/:token',component:LoginComponent},
  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule),canActivate:[AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
