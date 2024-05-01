import {Component, OnInit} from '@angular/core';
import {QuizType} from "../types/quiz.type";
import {MainService} from "../services/main.service";
import {ResultType} from "../types/result.type";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss'
})
export class ResultComponent implements OnInit {
  Quizzes: { isParticipant: boolean, quiz: QuizType }[] = [];

  selectedQuiz: { isParticipant: boolean, quiz: QuizType } | null = null;

  selectedQuizResult: ResultType = {answers: [], completedAt: null, quizId: "", score: 0, userId: ""}
  totalTimeTakeForQuiz:number = 0

  constructor(private ms: MainService) {

  }

  ngOnInit() {
    this.getAllQuizzes()
  }

  getAllQuizzes() {
    this.ms.getQuizForStudent().subscribe({
      next: (result) => {
        this.Quizzes = result.data
      }
    })
  }

  onSelectedQuizChange(event: Event) {
    console.log((event.target as HTMLSelectElement).value)
    let id = (event.target as HTMLSelectElement).value
    this.selectedQuiz = this.Quizzes.filter(q => q.quiz._id === id)[0]
    if (this.selectedQuiz)
      this.getQuizResultForStudent()
  }

  getQuizResultForStudent() {
    this.ms.getQuizResultForStudent(this.selectedQuiz?.quiz._id || '').subscribe({
      next: (result) => {
        console.log(result)
        this.selectedQuizResult = result.data[0]
        this.selectedQuizResult.answers.forEach((answer) => {
          this.totalTimeTakeForQuiz += parseInt(String(answer.timeTaken))
        })
      },
      error: (err) => {

      }
    })
  }
}
