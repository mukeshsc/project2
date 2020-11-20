import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/service/comman-service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource} from '@angular/material/tree';

import {
  MatSnackBar
} from '@angular/material/snack-bar';
import { NestedTreeControl } from '@angular/cdk/tree';


interface ModuleNode {
  name: string;
  read: boolean;
  write:boolean;
  both: boolean;
  children?: ModuleNode[];
}


@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.scss']
})
export class AccessComponent implements OnInit {
  roleType:any;
  roleData:any = [];
  TREE_DATA: ModuleNode[] = [
    {
      name: 'Fruit',
      read:  false,
      write: false,
      both : false,
      children: [
        {name: 'Apple', read:false, write:false,both:false},
        {name: 'Banana',read:false, write:false,both:false},
        {name: 'Fruit loops',read:false, write:false,both:false},
      ]
    }, {
      name: 'Vegetables',
      read:  false,
      write: false,
      both : false,
      children: [
        {
          name: 'Green',read:false, write:false,both:false,
          children: [
            {name: 'Broccoli',read:false, write:false,both:false},
            {name: 'Brussels sprouts',read:false, write:false,both:false},
          ]
        }, {
          name: 'Orange',read:false, write:false,both:false,
          children: [
            {name: 'Pumpkins',read:false, write:false,both:false},
            {name: 'Carrots',read:false, write:false,both:false},
          ]
        },
      ]
    },
  ];
  
  treeControl = new NestedTreeControl<ModuleNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<ModuleNode>();
  constructor( public _api: CommonServiceService, public ngxService: NgxUiLoaderService, public _snackBar: MatSnackBar) { 
    this.dataSource.data = this.TREE_DATA;
  }

  ngOnInit(): void {
    this.getRole();
  }
// Get Role Type
async getRole(){
  this.ngxService.start();
  await(this._api.getRole().subscribe(res => {
    this.ngxService.stop();
    const response: any = res;
    if (response.success == true){
      console.log(response.data)
      this.roleData = response.data;
      console.log(this.roleData)
      this.roleType = this.roleType[0].role_Type;
    }else{
    }
    console.log(res);
  },err => {
    const error = err.error;
    this.ngxService.stop();
  }));

}

// Save Access 

save(){

}


hasChild = (_: number, node: ModuleNode) => !!node.children && node.children.length > 0;


 // alert message after api response
 openSnackBar(msg) {
  this._snackBar.open(msg, 'Ok', {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
  });
}

}

