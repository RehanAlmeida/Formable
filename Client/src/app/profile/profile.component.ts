import {Component, effect, OnInit} from '@angular/core';
import {UserType} from "../types/user.type";
import {AuthService} from "../services/auth.service";
import {AlertService} from "../../shared/services/alert.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  data: UserType = {email: "", id: "", name: "", password: "", user_type: 0};

  currentPwd: string = ''
  newPassword: string = ''
  isAdmin: boolean = false;

  constructor(private as: AuthService, private alert: AlertService) {
    effect(() => {
      this.isAdmin = this.as.isAdmin()
      console.log(this.isAdmin)
    });
  }

  ngOnInit() {
    this.getUser()
  }

  getUser() {
    this.as.getUser().subscribe({
      next: (r) => {
        console.log(r)
        this.data = r.data
      }
    })
  }

  updateUser() {
    this.data.password = this.newPassword

    this.as.updateProfile(this.data).subscribe({
      next: (r) => {
        console.log(r)
        this.data = r.data
        this.currentPwd = ''
        this.newPassword = ''
        this.alert.showAlert('success', 'Profile has been updated successfully!')
      },
      error: (err) => {
        console.log(err)
        this.alert.showAlert('danger', err.error.msg + '\n. Try again!')
      }
    })
  }
}
