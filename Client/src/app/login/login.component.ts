import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {LoginType} from "../types/login.type";
import {UserType} from "../types/user.type";
import {Router} from "@angular/router";
import {AlertService} from "../../shared/services/alert.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginData: LoginType = {
    email: "", password: ""
  }

  constructor(private as: AuthService, private router: Router, private alert: AlertService) {
  }

  ngOnInit() {

  }

  onLogin() {
    this.as.login(this.loginData).subscribe((r) => {
      console.log(r)
      if (r.msg === "login successfully") {
        this.as.isLoggedIn.set(true)
        localStorage.setItem("isLoggedIn", "true")
        localStorage.setItem("userId", (r.data as UserType).id)
        if ((r.data as UserType).user_type === 0) {
          this.as.isAdmin.set(true)
        }
        this.router.navigate(['/'])
      } else {
        this.alert.showAlert('danger', r.msg)
      }
    }, (error) => {
      console.log(error);

    })
  }
}
