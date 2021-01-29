import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CommonServiceService } from 'src/app/service/comman-service.service';
import { ViewSurveyComponent } from '../view-survey/view-survey.component';

@Component({
  selector: 'app-add-survey',
  templateUrl: './add-survey.component.html',
  styleUrls: ['./add-survey.component.scss']
})
export class AddSurveyComponent implements OnInit {
  value ={};
  segmentData:any = [];
  formName ='';
  formDescription = '';


  question = [
    {

      "survey_Type":"TEst",
      "survey_Title":"Test",
      "survey_Description":"REWE",
      "survey_OptionArray":[{"value":""}],
      "survey_SubQuestion":[],
      "survey_SliderOption":{"left":0,"label":'',"right":100},
      "survey_Answer":"",
      "survey_ColumnArray": [],
      "survey_RowArray": [],
      "isRequired":0,
      "ip_Address" :"12.443.22.11",
      "survey_Category":""
    }
  ];
  qeustionType = [
    { label:'Rating',value:'rating'},
    { label:'Drop Down',value:'dropdown'},
    { label:'Radio Button',value:'radio'},
    { label:'Slider',value:'slider'},
    { label:'Open Ended',value:'textarea'},
    { label:'Multiple Choice',value:'multiSelect'},
    { label:'Linkert',value:'linkert'},
    { label:'Matrix',value:'matrix'},
    { label:'Text Box',value:'text'}
  ]
  disTab = true;
  constructor(public router:Router , public dialog: MatDialog, public _api: CommonServiceService, public ngxService: NgxUiLoaderService, public _snackBar: MatSnackBar ) { }

  ngOnInit(): void {
  }


  next() {
        this.question.push({
          "survey_Type":"TEst",
          "survey_Title":"Test",
          "survey_Description":"REWE",
          "survey_OptionArray":[{"value":""}],
          "survey_SubQuestion":[],
          "survey_SliderOption":{"left":0,"label":'',"right":100},
          "survey_Answer":"",
          "survey_ColumnArray": [],
          "survey_RowArray": [],
          "isRequired":0,
          "ip_Address" :"12.443.22.11",
          "survey_Category":""
        })
  }


  // add question
  async addHra(){
    let  q = this.question[this.question.length - 1]
    if(this.formName == '' || this.formDescription == '' || q.survey_Type == '' || q.survey_Title == '' ||  q.survey_Category == ''  ){
      this.openErrrorSnackBar('Please fill all field to move to next question');
    }else{

     let formData =  {
        "survey_Name":this.formName,
        "survey_Description":this.formDescription,
        "userId":JSON.parse(localStorage.getItem('userData')).user_id,
        "companyId":JSON.parse(localStorage.getItem('userData')).company_id,
        "questionArray":this.question
        }
      this.ngxService.start();
      await(this._api.addSurveyQuestion(formData).subscribe(res => {
        this.ngxService.stop();
        const response: any = res;
        if (response.success == true){
          this.openSnackBar(response.message);
          this.router.navigate(['/list-survey']);
        }else{
          this.openErrrorSnackBar(response.message);
        }
        console.log(res);
      }, err => {
        const error = err.error;
        this.openErrrorSnackBar(error.message);
        this.ngxService.stop();
      }));
    }
  }

  addOption(i){
    this.question[i].survey_OptionArray.push({value:''})
  }

  removeOption(i,io){
    this.question[i].survey_OptionArray.splice(io,1);
  }

  addColumn(i) {
    this.value = { label: "" };
    this.question[i].survey_ColumnArray.push(this.value)
    if(this.question[i].survey_RowArray.length == 0){
      this.question[i].survey_RowArray.push({ label: "",correct:1 })
    }
  }

  removeColumn(i, idx) {
    this.question[i].survey_ColumnArray.splice(idx, 1)
    if(this.question[i].survey_ColumnArray.length == 0){
      this.question[i].survey_RowArray = [];
    }
  }

  addRow(i) {
    this.question[i].survey_RowArray.push({ label: "",correct:1 })
    console.log(this.question[i])
  }

  removeRow(i, rawIndex) {
    this.question[i].survey_RowArray.splice(rawIndex, 1)
  }



  // copy code
  copy(i){
    let obj = this.question[i];
    this.question.push(obj);
  }

  // delete question
  delete(i){
    this.question.splice(i,1);
  }



  changeRequired(e,i){
    console.log(e)
    if(e.checked){
      this.question[i].isRequired = 1
    }else{
      this.question[i].isRequired = 0
    }
  }

// open hra question preview modal
openPreviewModal() {
  const dialogRef = this.dialog.open(ViewSurveyComponent,{
    width: '90%',
    height:'90%',
    data:{
      hraP:JSON.stringify(this.question)
    }
  },
  );

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
    // this.getRole();
  });
}

    // alert message after api response success
    openSnackBar(msg) {
      this._snackBar.open(msg, 'Ok', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['success-alert']
      });
    }
    // alert message after api response failure
    openErrrorSnackBar(msg) {
      this._snackBar.open(msg, 'Ok', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['failure-alert']
      });
    }
}
