import {Component} from '@angular/core';
import {UserType} from "../types/user.type";
import {AuthService} from "../services/auth.service";
import {AlertService} from "../../shared/services/alert.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  data: UserType = {
    email: "", id: "", name: "", password: "", user_type: 0
  }

  constructor(private as: AuthService, private alert: AlertService,private router:Router) {
  }

  onRegister() {
    this.as.register(this.data).subscribe((r) => {
      console.log(r)
      localStorage.setItem("userId", (r.data as UserType).id)
      this.as.isLoggedIn.set(true)
      this.router.navigate(['/'])
    }, (error) => {
      this.alert.showAlert('danger', error.error.message)
    })
  }
}
