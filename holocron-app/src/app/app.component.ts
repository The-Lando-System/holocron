import { Component, OnInit } from '@angular/core';
import { Broadcaster } from './services/broadcaster';
import { User, AuthService, LOGIN_EVENT } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  private user:User;

  constructor(
    private broadcaster: Broadcaster,
    private authSvc: AuthService
  ){}
  
  ngOnInit(): void {
    this.user = this.authSvc.getUser();
    this.listenForLogin();
  }

  login(): void {
    this.authSvc.login();
  }

  logout(): void {
    this.authSvc.logout();
  }

  listenForLogin(): void {
    this.broadcaster.on(LOGIN_EVENT).subscribe(() => {
      this.user = this.authSvc.getUser();
    });
  }

}