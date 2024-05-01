import {Component, OnInit} from '@angular/core';
import {QuizType} from "../../app/types/quiz.type";
import {QuizService} from "../services/quiz.service";
import {ResultType} from "../../app/types/result.type";
import {ChartData, ChartType} from 'chart.js';
import {QuestionType} from "../../app/types/question.type";

@Component({
  selector: 'app-result-analysis',
  templateUrl: './result-analysis.component.html',
  styleUrl: './result-analysis.component.scss'
})
export class ResultAnalysisComponent implements OnInit {
  Quizzes: QuizType[] = [];
  selectedQuiz: QuizType | null = null

  selectedQuizResult: ResultType[] = []

  constructor(private qs: QuizService) {
  }

  ngOnInit() {
    this.getAllQuizzes()
  }

  getAllQuizzes() {
    this.qs.getAllQuiz().subscribe({
      next: (result) => {
        this.Quizzes = result.data
      }
    })
  }

  onSelectedQuizChange(event: Event) {
    let id = (event.target as HTMLSelectElement).value
    this.selectedQuiz = this.Quizzes.filter(q => q._id === id)[0]
    if (this.selectedQuiz)
      this.getQuizResultById()
  }

  getQuizResultById() {
    this.qs.getQuizResultByQuizId(this.selectedQuiz?._id || '').subscribe({
      next: (result) => {
        console.log(result)
        this.selectedQuizResult = result.data
      },
      error: err => {
        console.log(err)
      }
    })
  }

  public barChartOptions = {
    scales: {
      x: {},
      y: {
        min: 0,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };
  public barChartType = 'bar' as const;


  public pieChartOptions: any = {
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        formatter: (value: any, ctx: any) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
          return '';
        },
      },
    },
  };

  public pieChartType: ChartType = 'pie';

  getChartDataForQuestion(que: QuestionType, i: number) {
    const answerCounts: Map<string, number> = new Map();

    this.selectedQuizResult.forEach((result) => {
      const answer = result.answers[i]?.answer;
      answerCounts.set(answer, (answerCounts.get(answer) || 0) + 1);
    });

    const labels = Array.from(answerCounts.keys());
    const data = Array.from(answerCounts.values());

    return {
      labels: labels,
      datasets: [
        {data: data, label: 'Answer'},
      ],
    };
  }

  getChartDataForAvgTime() {
    let labels: string[] = [];
    let data: number[] = [];

    this.selectedQuiz?.questions.forEach((question, index) => {
      labels.push('Question ' + (index + 1));

      const totalTime = this.selectedQuizResult.reduce((acc, result) => {
        return acc + result.answers[index]?.timeTaken;
      }, 0);

      const averageTime = this.selectedQuizResult.length > 0 ? totalTime / this.selectedQuizResult.length : 0;

      data.push(averageTime);
    });

    return {
      labels: labels,
      datasets: [
        {data: data, label: 'Average Time Taken'},
      ],
    };
  }

}
