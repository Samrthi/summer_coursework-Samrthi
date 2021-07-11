import {Component, OnInit} from '@angular/core';
import {StorageService} from "./storage.service";
import {CookieService} from "ngx-cookie-service";
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = "Robert's list";
  logged_in = false

  constructor(
      private storage: StorageService,
      private auth: AuthService,
      private cookieService: CookieService
  ){
  }

  ngOnInit(): void {
    if (this.cookieService.check('logged_in')) {
      this.logged_in = true
    }
  }


  signOut(): void {
    this.auth.logout()
  }
}
