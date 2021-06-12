import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject, BehaviorSubject } from 'rxjs';
import {MessageService} from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class OnpassiveService {
  baseUrl = environment.baseUrl;

  onErrorInterceptor$: Subject<any> = new BehaviorSubject<any>(null);
  emitErrorInterceptor(value: boolean) {
    this.onErrorInterceptor$.next(value);
  }
  get showErrorInterceptor(): BehaviorSubject<any> {
    return (this.onErrorInterceptor$ as BehaviorSubject<any>);
  }
  constructor(private http: HttpClient,private messageService: MessageService) { }
  showtoast(s:number,m:string) {
    let summary = s===0?'Error':'Success';
    let severity = s===0?'error':'success';
    this.messageService.add({severity:severity, summary: summary, detail: m});
}
  postHeaders() {
    let headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    return headers;
  }
  signup(data:any){
    let url = `${this.baseUrl}users/signup`;
    let headers = this.postHeaders();
    return this.http.post(url, data, { headers: headers });
  }
  signin(data:any){
    let url = `${this.baseUrl}users/signin`;
    let headers = this.postHeaders();
    return this.http.post(url, data, { headers: headers });
  }
  forgotPw(uname:String){
    let url = `${this.baseUrl}users/forgetpw/${uname}`
    return this.http.get(url);
  }
  resetPw(data:any){
    let url = `${this.baseUrl}users/resetpw`;
    let headers = this.postHeaders();
    return this.http.put(url, data, { headers: headers });
  }

  getEmployeeById(eid:string){
    let url = `${this.baseUrl}employees/getEmployeeById/${eid}`
    return this.http.get(url);
  }

  createEmployee(data:any){
    let url = `${this.baseUrl}employees/createEmployee`;
    let headers = this.postHeaders();
    return this.http.post(url, data, { headers: headers });
  }
  deleteEmployee(eid:string){
    let url = `${this.baseUrl}employees/deleteEmployee/${eid}`;
    let headers = this.postHeaders();
    return this.http.delete(url, { headers: headers });
  }
  updateEmployee(data:any){
    let url = `${this.baseUrl}employees/updateEmployee`;
    let headers = this.postHeaders();
    return this.http.put(url, data, { headers: headers });
  }
  departmentCounts(){
    let url = `${this.baseUrl}employees/departmentCounts`;
    return this.http.get(url); 
  }
  getMasters(){
    let url = `${this.baseUrl}employees/getMasters`;
    return this.http.get(url);
  }

  getEmployees(l:number,s:number,q:string){
    let url = `${this.baseUrl}employees/getEmployees/${l}/${s}${q}`;
    return this.http.get(url);
  }
}
