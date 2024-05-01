import {Component, effect, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {MainService} from "../services/main.service";
import {QuizType} from "../types/quiz.type";
import {UserService} from "../../admin/services/user.service";
import {UserType} from "../types/user.type";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  isLoggedIn: boolean = false;
  isAdmin: boolean = false;


  allQuiz: { isParticipated: boolean, quiz: QuizType }[] = []
  allUsers: UserType[] = [];

  constructor(as: AuthService, private ms: MainService, private us: UserService) {
    effect(() => {
      this.isLoggedIn = as.isLoggedIn()
      this.isAdmin = as.isAdmin()
      console.log(this.isLoggedIn, as.isLoggedIn())
      if (!this.isLoggedIn) {
        // window.location.replace('/')
      }
      if (this.isAdmin) this.getAllUsers()
    });
  }

  ngOnInit() {
    this.ms.getQuizForStudent().subscribe({
      next: (result) => {
        console.log(result)
        this.allQuiz = result.data
      },
      error: (err) => {
      }
    })

    if (this.isAdmin) {

    }
  }

  getAllUsers() {
    this.us.getUsers().subscribe({
      next: (result) => {
        this.allUsers = result.data
      }
    })
  }

  startQuizSession(_id: string | undefined) {
    window.open(`http://localhost:4200/quiz/?id=${_id}`, '_blank')
  }

  getActiveQuizzes() {
    return this.allQuiz.filter(q => q.quiz.status).length
  }
}
