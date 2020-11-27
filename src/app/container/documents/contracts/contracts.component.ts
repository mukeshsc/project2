import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonServiceService } from 'src/app/service/comman-service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { environment } from '../../../../environments/environment';
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ContractsAddComponent } from '../contracts-add/contracts-add.component';
@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss']
})
export class ContractsComponent implements OnInit {
// set header column
displayedColumns: string[] = ['position', 'name', 'contractValidity', 'category', 'status', 'Action'];

//set static data for table
dataSource = new MatTableDataSource([
  {position: '', name: 'John Doe', contractValidity: "10 Apr 2019 - 10 Apr 2020", category: 'Category Name', status: '0',Action:'Expire in 10 Days',selected:false},
  {position: '', name: 'John Doe', contractValidity: "10 Apr 2019 - 10 Apr 2020", category: 'Category Name', status: '1',Action:'Expire in 10 Days',selected:false},
  {position: '', name: 'John Doe', contractValidity: "10 Apr 2019 - 10 Apr 2020", category: 'Category Name', status: '2',Action:'Expire in 10 Days',selected:false},
  {position: '', name: 'John Doe', contractValidity: "10 Apr 2019 - 10 Apr 2020", category: 'Category Name', status: '1',Action:'Expire in 10 Days',selected:false},
  {position: '', name: 'John Doe', contractValidity: "10 Apr 2019 - 10 Apr 2020", category: 'Category Name', status: '2',Action:'Expire in 10 Days',selected:false},
  {position: '', name: 'John Doe', contractValidity: "10 Apr 2019 - 10 Apr 2020", category: 'Category Name', status: '0',Action:'Expire in 10 Days',selected:false},
  {position: '', name: 'John Doe', contractValidity: "10 Apr 2019 - 10 Apr 2020", category: 'Category Name', status: '1',Action:'Expire in 10 Days',selected:false},
  {position: '', name: 'John Doe', contractValidity: "10 Apr 2019 - 10 Apr 2020", category: 'Category Name', status: '2',Action:'Expire in 10 Days',selected:false},
  {position: '', name: 'John Doe', contractValidity: "10 Apr 2019 - 10 Apr 2020", category: 'Category Name', status: '0',Action:'Expire in 10 Days',selected:false},
  {position: '', name: 'John Doe', contractValidity: "10 Apr 2019 - 10 Apr 2020", category: 'Category Name', status: '2',Action:'Expire in 10 Days',selected:false},
  {position: '', name: 'John Doe', contractValidity: "10 Apr 2019 - 10 Apr 2020", category: 'Category Name', status: '1',Action:'Expire in 10 Days',selected:false},
  {position: '', name: 'John Doe', contractValidity: "10 Apr 2019 - 10 Apr 2020", category: 'Category Name', status: '0',Action:'Expire in 10 Days',selected:false},

]);

// table sorting and pagination
@ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
@ViewChild(MatSort,{static:false}) sort: MatSort;
files: File[] = [];

constructor(public dialog: MatDialog, public _api: CommonServiceService, public ngxService: NgxUiLoaderService, public _snackBar: MatSnackBar) { }

ngOnInit(): void {


}

select(row){
  console.log(row)
  return row.selected = true;
}

// onSelect image
async uploadDoc(event) {
  console.log(event);
  this.files = [...event.addedFiles];

}

// onRemove image
onRemove(event) {
  console.log(event);
  this.files.splice(this.files.indexOf(event), 1);
}

// open add Contracts modal
openContractAddModal() {
  const dialogRef = this.dialog.open(ContractsAddComponent,{
    maxWidth: '500px',
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}
}
