import {Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiResponseType} from "../types/api-response.type";
import {environment} from "../../environments/environment";
import {ResultType} from "../types/result.type";

@Injectable({
  providedIn: 'root'
})
export class MainService {

  isQuizCompleted: WritableSignal<boolean> = signal(false);

  constructor(private http: HttpClient) {
  }

  getAllQuiz() {
    return this.http.get<ApiResponseType>(`${environment.API}quiz`)
  }

  getQuizForStudent() {
    return this.http.post<ApiResponseType>(`${environment.API}quiz/student`, {userId: localStorage.getItem("userId")})
  }

  getQuizById(id: string) {
    return this.http.get<ApiResponseType>(`${environment.API}quiz/${id}`)
  }

  addNewResult(result: ResultType) {
    return this.http.post<ApiResponseType>(`${environment.API}result`, result, {})
  }

  getQuizResultForStudent(quizId: string) {
    return this.http.get<ApiResponseType>(`${environment.API}result/quiz/${quizId}/student/${localStorage.getItem("userId")}`)
  }
}
