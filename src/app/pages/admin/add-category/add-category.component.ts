import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from './../../../services/category.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category = {
    title: '',
    description: '',
  }

  constructor(private _category: CategoryService, private _snack: MatSnackBar, private _routerPage: Router) { }

  ngOnInit(): void {
  }

  formSubmit() {
    if (this.category.title.trim() == '' || this.category.title == null) {

      this._snack.open("Title required !!", '', {
        duration: 3000,
      });
      return;
    }

    this._category.addCategory(this.category).subscribe((data: any) => {
      this.category.title = ''
      this.category.description = ''
      Swal.fire("Success !!", 'Category is added successfully!', 'success')
      .then(() => {
        this._routerPage.navigate(['/admin/categories'])
      })
      ;
    },
      (error) => {
        console.log(error);
        Swal.fire("Success !!", 'Server error!', 'error');

      })
  }

}
