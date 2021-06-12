import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class CookiesService {

  constructor(
    private cookieService:CookieService
  ) { }

  
  setCookie(n:string,v:string,e:number){
    let t = new Date().getTime() + (e*1000)
    this.cookieService.set(n,v, {expires:new Date(t)} );
  }
  getCookie(n:string){
     return this.cookieService.get(n);
  }
  getAllCookies(){
    return this.cookieService.getAll();
  }
  checkCookie(n:string){
    return this.cookieService.check(n);
  }
  deleteCookie(n:string){
    return this.cookieService.delete(n);
  }
  deleteAllCookies(){
    this.cookieService.deleteAll();
  }
}
