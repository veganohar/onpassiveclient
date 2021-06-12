import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookiesService } from '../cookie.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(
    public cs:CookiesService,
    public router:Router
  ) { }

  ngOnInit(): void {
  }
  onLogout(){
    this.cs.deleteAllCookies();
    this.router.navigate(['']);
  }
}
