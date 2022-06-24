import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';


interface FoodNode {
  name: string,
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] =
  [
    {
      name: 'Fruit',
      children: [{ name: 'Apple' }, { name: 'Banna' }, { name: 'Fruit loops' }],

    },
    {
      name: 'Vegatebale',
      children: [
        {
          name: 'Green',
          children: [{ name: 'Broccoli' }, { name: 'Brussels sprouts' }]
        },
        {
          name: 'Orange',
          children: [{ name: 'Broccoli111' }, { name: 'Brussels sprouts222' }]
        },
      ]
    }

  ]

interface ExampleFlatNode {
  expandable: boolean,
  name: string,
  level: number,
}

interface ExampleFlatNode {
  expandable: boolean,
  name: string,
  level: number,
}

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  panelOpenState = true;
  // private _transformer = (node: FoodNode, level: number) => {
  //   return {
  //     expandable: !!node.children && node.children.length > 0,
  //     name: node.name,
  //     level: level
  //   }
  // }

  // treeControl = new FlatTreeControl<ExampleFlatNode>(
  //   (node) => node.level,
  //   (node) => node.expandable
  // )

  // treeFlattener = new MatTreeFlattener(
  //   this._transformer,
  //   (node) => node.level,
  //   (node) => node.expandable,
  //   (node) => node.children
  // )

  // dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  categories: any;

  constructor(
    private _cat: CategoryService, private _nack: MatSnackBar
  ) {
    // this.dataSource.data = TREE_DATA
  }

  // hasChild = (_: number, node: ExampleFlatNode) => node.expandable

  ngOnInit(): void {
    
    this._cat.categories().subscribe(
      (data: any) => {
        this.categories = data;
      }, (error) => {
        this._nack.open("Error in loading category from server", '', { duration: 3000 });
      }
    )
  }




}


