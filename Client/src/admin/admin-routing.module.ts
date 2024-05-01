import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuizComponent} from "./quiz/quiz.component";
import {UsersComponent} from "./users/users.component";
import {ResultAnalysisComponent} from "./result-analysis/result-analysis.component";

const routes: Routes = [
  {path: 'quiz', component: QuizComponent},
  {path: 'users', component: UsersComponent},
  {path: 'result-analysis', component: ResultAnalysisComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
