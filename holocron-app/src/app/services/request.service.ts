import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RequestService implements OnInit {

  constructor(
    private http: HttpClient,
    private router: Router,
    private notificationSvc: NotificationService,
    private authSvc: AuthService
  ) {}

  ngOnInit(): void {}

  get(url:string, headers:HttpHeaders): Promise<any> {

    this.notificationSvc.loading(true);

    let options = {};
    if (headers) {
      options['headers'] = headers;
    }

    return new Promise<any>((resolve, reject) => {
      this.http.get(url, options)
      .toPromise()
      .then((res:any) => {
        this.notificationSvc.loading(false);
        resolve(res);
      }).catch((err:Response) => {
        this.handleErrorResponse(err);
        this.notificationSvc.loading(false);
        reject(err);
      });
    });
  }

  post(url:string, body:any, headers:HttpHeaders): Promise<any> {
    
    this.notificationSvc.loading(true);

    let options = {};
    if (headers) {
      options['headers'] = headers;
    }

    return new Promise<any>((resolve, reject) => {
      this.http.post(url, body, options)
      .toPromise()
      .then((res:any) => {
        this.notificationSvc.loading(false);
        resolve(res);
      }).catch((err:Response) => {
        this.handleErrorResponse(err);
        this.notificationSvc.loading(false);
        reject(err);
      });
    });
  }

  put(url:string, body:any, headers:HttpHeaders): Promise<any> {
    
    this.notificationSvc.loading(true);

    let options = {};
    if (headers) {
      options['headers'] = headers;
    }

    return new Promise<any>((resolve, reject) => {
      this.http.put(url, body, options)
      .toPromise()
      .then((res:any) => {
        this.notificationSvc.loading(false);
        resolve(res);
      }).catch((err:Response) => {
        this.handleErrorResponse(err);
        this.notificationSvc.loading(false);
        reject(err);
      });
    });
  }

  delete(url:string, headers:HttpHeaders): Promise<any> {
    
    this.notificationSvc.loading(true);

    let options = {};
    if (headers) {
      options['headers'] = headers;
    }

    return new Promise<any>((resolve, reject) => {
      this.http.delete(url, options)
      .toPromise()
      .then((res:any) => {
        this.notificationSvc.loading(false);
        resolve(res);
      }).catch((err:Response) => {
        this.notificationSvc.loading(false);
        this.handleErrorResponse(err);
        reject(err);
      });
    });
  }

  private handleErrorResponse(err:any): void {

    if (!err.hasOwnProperty('error') || !err['error'].hasOwnProperty('type')) {
      console.error(err);
    }

    let errorType = err.error.type;

    if (errorType === 'NO_TOKEN' || errorType === 'VERIFY_FAIL') {
      console.error(`OAuth2 Access token error: ${errorType}`);
      this.authSvc.logout();
    } else {
      console.error(err);
    }
  }

}