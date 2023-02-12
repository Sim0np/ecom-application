import { Component, OnInit } from '@angular/core';
import {SecurityService} from "./services/security.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ecom-web-app';

  constructor(public securityService: SecurityService) {

  }

  ngOnInit(): void {
  }

  async login(){
    await this.securityService.kcService.login({
      redirectUri : window.location.origin
    })
  }

  onLogout() {
    this.securityService.kcService.logout(window.location.origin);
  }
}
