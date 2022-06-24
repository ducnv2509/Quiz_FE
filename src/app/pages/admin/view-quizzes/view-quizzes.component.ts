import { QuizService } from './../../../services/quiz.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes: any = []

  constructor(private _quiz: QuizService) { }

  ngOnInit(): void {
    this._quiz.quizzes().subscribe((data: any) => {
      this.quizzes = data;
      console.log(this.quizzes);
    },
      (error) => {
        console.log(error);
        Swal.fire("Error !", 'Error in loading data', 'error');
      }

    )
  }
  deleteQuiz(qid: any) {
    Swal.fire({
      icon: 'warning',
      title: "Are you sure ?",
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this._quiz.deleteQuiz(qid).subscribe(
          (data) => {
            this.quizzes = this.quizzes.filter((quiz: any) => quiz.qid != qid)
            Swal.fire('Success', 'Quiz deleted', 'success')
          }, (error) => {
            Swal.fire('Error', 'Error in deleted quiz', 'error')
          }
        )
      }
    })
  }

}
