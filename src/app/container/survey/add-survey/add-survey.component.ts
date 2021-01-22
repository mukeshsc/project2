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
  tab:number = 0;
  value ={};
  lifeStyleScore = 100;
  bodyScore = 100;
  mindScore = 100;
  segmentData:any = [];
  formName ='';
  formDescription = '';
  question = [
    {
      type:'',
      title:'',
      category:'',
      segments:'',
      description:'',
      optionArray:[{value:'',point:null}],
      subQuestion:[],
      sliderOption:{left:0,label:'',right:100},
      answer:'',
      columnArray: [],
      rowArray: [],
      score:0,
      isRequired:0,
			"ip_Address"    :"12.443.22.11"
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


  next(i) {
    let  q = this.question[i]
    if(q.type == '' || q.title == '' || q.score == 0 || q.category == '' || q.segments == '' || q.description == '' ){
      this.openErrrorSnackBar('Please fill all field to move to next question')

    }else{

      this.tab++;
      if (this.tab >= this.question.length) {
        this.question.push({
          type:'',
          title:'',
          category:'',
          segments:'',
          description:'',
          optionArray:[{value:'',point:null}],
          subQuestion:[],
          sliderOption:{left:0,label:'',right:100},
          answer:'',
          columnArray: [],
          rowArray: [],
          score:0,
          isRequired:0,
          "ip_Address"    :"12.443.22.11"
        })
      }
    }
  }
  prev() {
    if (this.tab > 0) {
      this.tab--;
    }
  }


  // add question
  async addHra(){
    let  q = this.question[this.question.length - 1]
    if(q.type == '' || q.title == '' || q.score == 0 || q.category == '' || q.segments == '' || q.description == '' ){
      this.openErrrorSnackBar('Please fill all field to move to next question');
    }else{
      let data = {
          data:this.question
        };
      this.ngxService.start();
      // await(this._api.addHra(data).subscribe(res => {
      //   this.ngxService.stop();
      //   const response: any = res;
      //   if (response.success == true){
      //     this.openSnackBar(response.message);
      //     this.router.navigate(['/hra']);
      //   }else{
      //     this.openErrrorSnackBar(response.message);
      //   }
      //   console.log(res);
      // }, err => {
      //   const error = err.error;
      //   this.openErrrorSnackBar(error.message);
      //   this.ngxService.stop();
      // }));
    }
  }

  addOption(i){
    this.question[i].optionArray.push({value:'',point:null})
  }

  removeOption(i,io){
    this.question[i].optionArray.splice(io,1);
  }

  addColumn(i) {
    this.value = { label: "" };
    this.question[i].columnArray.push(this.value)
    if(this.question[i].rowArray.length == 0){
      this.question[i].rowArray.push({ label: "",correct:1 })
    }
  }

  removeColumn(i, idx) {
    this.question[i].columnArray.splice(idx, 1)
    if(this.question[i].columnArray.length == 0){
      this.question[i].rowArray = [];
    }
  }

  addRow(i) {
    this.question[i].rowArray.push({ label: "",correct:1 })
    console.log(this.question[i])
  }

  removeRow(i, rawIndex) {
    this.question[i].rowArray.splice(rawIndex, 1)
  }

  countScore(q){
    if(q.category == 'mind'){
      if(this.mindScore < q.score){
        this.openErrrorSnackBar('Sorry you can not add this question total score of this category is greator than 100')
        this.disTab = false;
      }else{
        this.mindScore = this.mindScore - q.score;
        this.disTab = true
      }
    }
    if(q.category == 'body'){
      if(this.bodyScore < q.score){
        this.openErrrorSnackBar('Sorry you can not add this question total score of this category is greator than 100')
        this.disTab = false;
      }else{
        this.bodyScore = this.bodyScore - q.score;
        this.disTab = true
      }
    }
    if(q.category == 'lifestyle'){
      if(this.lifeStyleScore < q.score){
        this.openErrrorSnackBar('Sorry you can not add this question total score of this category is greator than 100')
        this.disTab = false;
      }else{
        this.lifeStyleScore = this.lifeStyleScore - q.score;
        this.disTab = true
      }
    }
  }


  // copy code
  copy(i){
    let obj = this.question[i];
    this.question.push(obj);
    this.tab++;
  }

  // delete question
  delete(i){
    this.question.splice(i,1);
    this.tab--;
  }

  setSegment(e){
    console.log(e)
    if(e == 'body'){
      this.segmentData = ['Personal','Biometrics','Clinical History','Screening','Family history','Occupational history']
    }else if(e == 'mind'){
      this.segmentData = ['Stress and mental wellbeing','Readiness assessment']
    }else if(e == 'lifestyle'){
      this.segmentData = ['LifeStyle History - Diet','Lifestyle history - physical activity','Lifestyle history - physical activity','Lifestyle history - Sleep','Lifestyle history - alcohol']
    }
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
