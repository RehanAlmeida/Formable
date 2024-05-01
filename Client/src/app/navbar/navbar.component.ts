import {Component, effect} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {NavigationEnd, Router, Scroll} from "@angular/router";
import {UserType} from "../types/user.type";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  loggedIn: boolean = false;
  isAdmin: boolean = false;
  isHidden: boolean = false;
  user!: UserType;
  randomImage: string = '10';

  genders: string[] = ["men", "women"];

  constructor(as: AuthService, router: Router) {
    effect(() => {
      this.loggedIn = as.isLoggedIn()
      this.isAdmin = as.isAdmin()
      this.user = as.user() as UserType
    });

    this.randomImage = this.genders[Math.floor(Math.random() * 2)] + '/' + parseInt(String(Math.random() * (99 - 1) + 1)) + '.jpg';

    router.events.subscribe((event) => {
      if ((event as Scroll).routerEvent instanceof NavigationEnd) {
        this.isHidden = (((event as Scroll).routerEvent as NavigationEnd).url).replace("/", "").startsWith("quiz")
      }
    })
  }

  logout() {
    localStorage.clear()
    window.location.replace('/login')
  }
}
