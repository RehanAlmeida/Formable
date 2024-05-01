import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {QuizComponent} from './quiz/quiz.component';
import {UsersComponent} from './users/users.component';
import {ResultAnalysisComponent} from './result-analysis/result-analysis.component';
import {QuizListComponent} from './quiz/quiz-list/quiz-list.component';
import {AddNewQuizComponent} from './quiz/add-new-quiz/add-new-quiz.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {BaseChartDirective} from "ng2-charts";


@NgModule({
  declarations: [
    QuizComponent,
    UsersComponent,
    ResultAnalysisComponent,
    QuizListComponent,
    AddNewQuizComponent
  ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        BaseChartDirective
    ]
})
export class AdminModule {
}
