import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  qid: any;
  qTitle: any;
  questions: any = [];
  numberOfQuestion: any;
  isOK = true;
  nubQues: any

  constructor(

    private _route: ActivatedRoute, private _question: QuestionService,
    private _snack: MatSnackBar,
    private _quiz: QuizService
  ) { }

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];
    // console.log(this.qid)
    this.qTitle = this._route.snapshot.params['title'];
    this.numberOfQuestion = this._route.snapshot.params['numberOfQuestion'];
    this._question.getQuestionsOfQuiz(this.qid).subscribe((data: any) => {
      console.log(data)
      this.questions = data;
    }, (error) => {
      console.log(error)
    })
  }

  //delete questions from
  deleteQuestion(qid: any) {
    console.log(this.qid)
    Swal.fire({
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      title: 'Are you sure you want to delete this question?',
    }).then((result) => {
      if (result.isConfirmed) {
        this._question.deleteQuestion(qid).subscribe((data) => {
          this._snack.open('Question Deleted', '', {
            duration: 3000,
          });
          this.questions = this.questions.filter((q: any) => q.quesId != qid)
        }, (error) => {
          this._snack.open('Error deleting question', '', {
            duration: 3000,
          })
          console.error(error)
        })
      }
    })
  }

  randomForm() {

    this._question.insertExcel(this.qid, this.numberOfQuestion).subscribe((data) => {
      // this.questions = data
      location.reload();
    }, (error) => {
      console.log(error);
      // alert('somthing went wrong')
      this._snack.open('S??? c??u h???i ???? ?????. Kh??ng th??? random ti???p', '', {
        duration: 3000,
      });
    })

  }

  addAll() {
    this._question.checkQuestion(this.qid, this.numberOfQuestion).subscribe((data: any) => {
      Swal.fire({
        icon: 'success',
        title: 'Add all question successfully',
        text: 'Success',
      }).then(() => {
        location.reload();
      })

    }, (error) => {
      this._snack.open('Thi???u c??u h???i', '', {
        duration: 3000,
      });
    })

  }

}
