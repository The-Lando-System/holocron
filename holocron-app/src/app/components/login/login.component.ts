import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User, AuthService } from '../../services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public content:any;

  private user:User;

  constructor(
    private authSvc: AuthService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.user = this.authSvc.getUser();
  }

  login(): void {
    this.authSvc.login()
    .then(() => {
      this.user = this.authSvc.getUser();
    });
  }

  logout(): void {
    this.authSvc.logout();
  }
  
}


