import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';
import { QuizService } from 'src/app/services/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  categories: any = [
  ];

  quizData = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestion: '',
    active: true,
    category: {
      cid: ''
    },
  }
  constructor(private _cat: CategoryService,
    private _snack: MatSnackBar,
    private _quiz: QuizService,
    private _router: Router) { }

  ngOnInit(): void {
    this._cat.categories().subscribe(
      (data: any) => {
        // load all categories
        this.categories = data;
        // console.log(data);
      },
      (error: any) => {
        console.log(error);
        Swal.fire("Error !", "error in loading data from serve", 'error')
      }
    )
  }

  addQuiz() {
    if (this.quizData.title.trim() == '' || this.quizData.title == null) {
      this._snack.open("Title required !!", '', {
        duration: 3000,
      })
      return;
    }

    if ( this.quizData.maxMarks == null) {
      this._snack.open("maxMarks required !!", '', {
        duration: 3000,
      })
      return;
    }

    if ( this.quizData.numberOfQuestion == null) {
      this._snack.open("numberOfQuestion required !!", '', {
        duration: 3000,
      })
      return;
    }

    if (this.quizData.category.cid == null) {
      this._snack.open("Category required !!", '', {
        duration: 3000,
      })
      return;
    }
    // validate

    // call server function
    this._quiz.addQuiz(this.quizData).subscribe(
      (data) => {
        Swal.fire('Success', 'quiz is added', 'success').then(() => {
          this._router.navigate(['/admin/quizzes'])
        });
        this.quizData = {
          title: '',
          description: '',
          maxMarks: '',
          numberOfQuestion: '',
          active: true,
          category: {
            cid: ''
          },
        }
      },
      (error) => {
        Swal.fire('Error', 'Error while adding quiz', 'error')
        console.log(error)
      }
    )


  }

}
