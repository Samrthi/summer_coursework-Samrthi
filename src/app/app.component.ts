import {Component, OnInit} from '@angular/core';
import {AuthService} from "./auth.service";
import {NotificationService} from "./notification.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = "Robert's list";

  constructor(
      public auth: AuthService,
      public router: Router,
      private notificationService: NotificationService,
      private snackBar: MatSnackBar,
      private dialog: MatDialog
  ) {
    this.notificationService.error$.subscribe((message) => {
      this.snackBar.open(message, '', { duration: 5000 });
    });

    // Alternative implementation:

    // this.notificationService.error$.subscribe((message) => {
    //   this.dialog.open(PopupComponent, { data: message });
    // });
  }

  logOut(): void {
    this.auth.logout()
  }

  signUp(){
    this.router.navigate(['signup'])
  }
}


import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './popup.html',
})
export class PopupComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}
}