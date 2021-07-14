import {Component, OnInit} from '@angular/core';
import {StorageService} from "./storage.service";
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = "Robert's list";

  constructor(
      public auth: AuthService
  ){};

  signOut(): void {
    this.auth.logout()
  }
}
