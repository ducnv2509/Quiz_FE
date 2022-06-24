import { MatSnackBar } from '@angular/material/snack-bar';
import { QuestionService } from 'src/app/services/question.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {
  public Editor = ClassicEditor;
  quesId = 0;
  question: any;
  // qTitle:any
  constructor(
    private _router: ActivatedRoute, private _question: QuestionService,
    private _snack: MatSnackBar, private _routerPage: Router

  ) { }

  ngOnInit(): void {

    this.quesId = this._router.snapshot.params['qid'];
    // this.qTitle = this._router.snapshot.params['title'];
    this._question.getQues(this.quesId).subscribe(
      (data: any) => {
        this.question = data;
        console.log(this.quesId);
      }, (error) => {
        console.log(error)
      }
    )
  }

  updateData(){
    if (this.question.content.trim() == '' || this.question.content == null) {
      this._snack.open("Content required !!", '', {
        duration: 3000,
      })
      return;
    }
    if (this.question.option1.trim() == '' || this.question.option1 == null) {
      this._snack.open("Option 1 required !!", '', {
        duration: 3000,
      })
      return;
    }
    if (this.question.option2.trim() == '' || this.question.option2 == null) {
      this._snack.open("Option 2 required !!", '', {
        duration: 3000,
      })
      return;
    }
    if (this.question.option3.trim() == '' || this.question.option3 == null) {
      this._snack.open("Option 3 required !!", '', {
        duration: 3000,
      })
      return;
    }
    if (this.question.option4.trim() == '' || this.question.option4 == null) {
      this._snack.open("Option 4 required !!", '', {
        duration: 3000,
      })
      return;
    }


    this._question.updateQuiz(this.question).subscribe(
      (data) => {
        Swal.fire('Success !!', 'Quiz update successfully', 'success').then((e) =>{
          this._routerPage.navigate(['/admin/quizzes'])
        });

      }
    )
  }

}
