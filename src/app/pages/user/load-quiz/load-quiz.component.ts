import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  catId:any;
  quizzes:any;
  constructor(
    private _router: ActivatedRoute, private _quiz: QuizService
  ) { }

  ngOnInit(): void {
    this.catId = this._router.snapshot.params['catId']
    this._router.params.subscribe((params) => {
      this.catId = params['catId'];
      if(this.catId == 0){
        console.log('load all the quiz')
        this._quiz.getActiveQuizzes().subscribe(
          (data: any) => {
            this.quizzes= data;
            console.log(this.quizzes)
          }, (error) => {
            console.log(error);
            alert('error in loading in serve')
          }
        )
      }else{
        console.log('load specific quiz')
        this._quiz.getActiveQuizzesOfCategory(this.catId).subscribe(
          (data: any) => {
            this.quizzes = data;
            console.log(this.quizzes)
          }, (error) => {
            console.log(error)
            alert('error in loading quiz in serve')
          }
        )
      }
    })
    
  }

}
