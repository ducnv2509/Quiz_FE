import { CategoryService } from './../../../services/category.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  categories:any = [];
  constructor(private _category: CategoryService) { }

  ngOnInit(): void {
    this._category.categories().subscribe((data:any) => {
      this.categories = data;
      console.log(this.categories);
    },
    (error)=>{
      console.error(error);
      Swal.fire("Error !!", "Error in loading data", 'error');
    }
    
    )
  }

}
