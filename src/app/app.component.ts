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
      private notificationService: NotificationService,
      private snackBar: MatSnackBar,
      private dialog: MatDialog
  ) {
    this.notificationService.notification$.subscribe((message) => {
      this.snackBar.open(message, '', { duration: 2000 });
    });
    this.notificationService.error$.subscribe((message) => {
      this.dialog.open(PopupComponent, { data: message });
    });
  }

  signOut(): void {
    this.auth.logout()
  }
}


import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './popup.html',
})
export class PopupComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}
}