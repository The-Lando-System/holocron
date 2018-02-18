import { Injectable, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class NotificationService implements OnInit {

  constructor(
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void {}

  success(message:string): void {
    this.snackBar.open(`Success! ${message}`,"ok",{
      duration: 2000,
    });
  }

  warn(message:string): void {
    this.snackBar.open(`Warning! ${message}`,"ok",{
      duration: 2000,
    });
  }

  fail(message:string): void {
    this.snackBar.open(`Fail! ${message}`,"ok",{
      duration: 2000,
    });
  }

  loading(isLoading:boolean): void {

  }

}