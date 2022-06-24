import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  constructor(private _router: ActivatedRoute, private _quiz: QuizService
    , private _category: CategoryService, private _snack: MatSnackBar, private _routerPage: Router
  ) { }

  qid = 0;
  quiz: any;
  categories: any;
  ngOnInit(): void {
    this.qid = this._router.snapshot.params['qid'];
    this._quiz.getQuiz(this.qid).subscribe(
      (data: any) => {
        this.quiz = data;
        console.log(data);

      },
      (error) => {
        console.log(error);
      }
    );

    this._category.categories().subscribe(
      (data: any) => {
        this.categories = data;
      }, (error) => {
        alert('error in loading category');
      }
    )
  }

  // update form sub

  public updateData() {
    //validate
    if (this.quiz.title.trim() == '' || this.quiz.title == null) {
      this._snack.open("Title required !!", '', {
        duration: 3000,
      })
      return;
    }

    if (this.quiz.maxMarks.trim() == '' || this.quiz.maxMarks == null) {
      this._snack.open("maxMarks required !!", '', {
        duration: 3000,
      })
      return;
    }

    if (this.quiz.numberOfQuestion.trim() == '' || this.quiz.numberOfQuestion == null) {
      this._snack.open("numberOfQuestion required !!", '', {
        duration: 3000,
      })
      return;
    }

    if (this.quiz.category.cid == null) {
      this._snack.open("Category required !!", '', {
        duration: 3000,
      })
      return;
    }

    this._quiz.updateQuiz(this.quiz).subscribe(
      (data) => {
        Swal.fire('Sucess !!', 'quiz update sucess', 'success').then((e) =>{
          this._routerPage.navigate(['/admin/quizzes'])
        })
      }, (error) => {
        Swal.fire('Error', 'Error in updating quiz', 'error')
        console.log(error)
      }
    )
  }

}
