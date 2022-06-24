import { QuestionService } from './../../../services/question.service';
import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  qid: any;
  questions: any;
  marksGot = 0;
  correctAnswer = 0;
  attempted = 0;
  isSubmit = false;
  
  history = {
    nameTest: '',
    nameCategory: '',
    marksGot: 0,
    correctAnswer: 0,
    questionError: 0
  }

  timer: any;

  constructor(private locationSt: LocationStrategy,
    private _route: ActivatedRoute,
    private _question: QuestionService) { }

  ngOnInit(): void {
    this.preventbackButton();
    this.qid = this._route.snapshot.params['qid'];
    console.log(this.qid);
    this.loadQuestions();
  }

  loadQuestions() {

    this._question.getQuestionsOfQuizForTest(this.qid).subscribe(
      (data: any) => {
        this.questions = data;
        this.timer = this.questions.length * 2 * 60;

        // this.questions.forEach((q: any) => {
        //   q['givenAnswer'] = '';
        // })
        console.log(this.questions);
        this.startTimer();
      },
      (error: any) => {
        console.log(error)
        Swal.fire("Error", "Error in loading questions of quiz", 'error')
      }
    )
  }

  addHistory() {

    this._question.historyExam(this.history).subscribe((data: any) => {
    }, (err: any) => {
      console.error(err)
    }
    )
  }

  preventbackButton() {
    history.pushState(null, location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, location.href);
    })
  }

  submitQuiz() {
    Swal.fire({
      title: 'Do you want to submit the quiz?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      icon: 'info'
    }).then((e) => {
      if (e.isConfirmed) {
        //calculation
        this.evalQuiz();
      }
    })
  }

  startTimer() {
    let t = window.setInterval(() => {
      if (this.timer <= 0) {
        this.evalQuiz()
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000)
  }

  getFormattedTime() {
    let mm = Math.floor(this.timer / 60)
    let ss = this.timer - mm * 60;
    return `${mm} min : ${ss} sec`
  }



  evalQuiz() {

    // call to serve to evalQuiz()
    this._question.evalQuiz(this.questions).subscribe(
      (data: any) => {
        console.log(data)
        this.marksGot = parseFloat(Number(data.marksGot).toFixed(2));
        this.correctAnswer = data.correctAnswer;
        this.attempted = data.attempted;
        this.history.correctAnswer= data.correctAnswer;
        this.history.marksGot = parseFloat(Number(data.marksGot).toFixed(2));
        this.history.questionError = data.attempted - data.correctAnswer;
        this.history.nameTest  = this.questions[0].quiz.title;
        this.history.nameCategory = this.questions[0].quiz.category.title;
        this._question.historyExam(this.history).subscribe((data: any)=>{

        })
        this.isSubmit = true;
      }, (error) => {
        console.log(error)
      }
    )
  }

  printPage() {
    window.print();
  }

}
