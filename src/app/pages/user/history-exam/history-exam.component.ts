import { QuestionService } from './../../../services/question.service';
import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-history-exam',
  templateUrl: './history-exam.component.html',
  styleUrls: ['./history-exam.component.css']
})
export class HistoryExamComponent implements OnInit {

  historys: any;
  constructor(

    private _question: QuestionService
  ) { }

  ngOnInit(): void {
    this._question.getHistory().subscribe(
      (data: any)=>{
        this.historys = data;
      }
    )
  }

}
