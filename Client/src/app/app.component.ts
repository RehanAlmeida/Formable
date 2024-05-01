import {Component, effect} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  isLoggedIn: boolean = false;

  constructor(as: AuthService, router: Router) {

  }
}
