import {Injectable} from '@angular/core';
import {QuizType} from "../../app/types/quiz.type";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ApiResponseType} from "../../app/types/api-response.type";

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) {

  }

  getAllQuiz() {
    return this.http.get<ApiResponseType>(`${environment.API}quiz`)
  }

  getQuizById(id: string) {
    return this.http.get<ApiResponseType>(`${environment.API}quiz/${id}`)
  }

  addNewQuiz(quiz: QuizType) {
    return this.http.post<ApiResponseType>(`${environment.API}quiz`, quiz, {})
  }

  updateQuiz(id: string, quiz: QuizType) {
    return this.http.put(`${environment.API}quiz/${id}`, quiz, {})
  }

  activateQuiz(id: string) {
    return this.http.post<ApiResponseType>(`${environment.API}quiz/activate/${id}`, {})
  }

  deactivateQuiz(id: string) {
    return this.http.post<ApiResponseType>(`${environment.API}quiz/de-activate/${id}`, {})

  }

  deleteQuiz(id: string) {
    return this.http.delete<ApiResponseType>(`${environment.API}quiz/${id}`, {})
  }

  getQuizResultByQuizId(id: string) {
    return this.http.get<ApiResponseType>(`${environment.API}result/quiz/${id}`)
  }
}
