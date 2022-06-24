import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  public Editor = ClassicEditor;


  qId: any;
  numberOfQuestion: any;
  qTitle: any;
  question = {
    quiz: {
      qid: '',
    },
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
  }

  constructor(
    private _route: ActivatedRoute, private _question: QuestionService,
    private _snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];
    this.numberOfQuestion = this._route.snapshot.params['numberOfQuestion'];
    this.question.quiz['qid'] = this.qId;
    console.log("this is questionId", this.question.quiz['qid'])
    // console.log(this.qId)
  }


  formSubmit() {
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
    this._question.addQuestion(this.question, this.qId, this.numberOfQuestion).subscribe(
      (data: any) => {
        Swal.fire('Success !!', 'Question Added successfully', 'success')
        this.question.content = '';
        this.question.option1 = '';
        this.question.option2 = '';
        this.question.option3 = '';
        this.question.option4 = '';
        this.question.answer = '';
      }, (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Số câu hỏi đã đủ ', 'error')
      }
    )
  }
}