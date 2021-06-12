import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,  Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookiesService } from './cookie.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router,private cs:CookiesService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      if(this.cs.checkCookie("accessToken")&&this.cs.getCookie("isLoggedIn")=="true"){
        return true;
      }else{
        alert('You are not allowed to view this page');
        this.router.navigate(['']);
          return false;
      }
  }
  
}
