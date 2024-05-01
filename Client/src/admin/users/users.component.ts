import {Component, OnInit} from '@angular/core';
import {UserType} from "../../app/types/user.type";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  users: UserType[] = [];

  constructor(private us: UserService) {
  }

  ngOnInit() {
    this.getAllUsers()
  }

  getAllUsers() {
    this.us.getUsers().subscribe({
      next: (r) => {
        this.users = r.data
      },
      complete: () => {

      },
      error: () => {

      }
    })
  }
}
