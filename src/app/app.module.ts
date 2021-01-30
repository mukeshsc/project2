import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTabsModule} from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import {MatChipsModule} from '@angular/material/chips';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { NgxDropzoneModule } from 'ngx-dropzone';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatExpansionModule} from '@angular/material/expansion';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { ChartsModule } from 'ng2-charts';
import {MatMenuModule} from '@angular/material/menu';
import {MatRadioModule} from '@angular/material/radio';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatTreeModule} from '@angular/material/tree';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';

import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonToggleModule} from '@angular/material/button-toggle';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './common/header/header.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { DashboardComponent } from './container/other/dashboard/dashboard.component';
import { UserRolesComponent } from './container/roles-access/user-roles/user-roles.component';
import { AccessComponent } from './container/roles-access/access/access.component';
import { RoleAddComponent } from './container/roles-access/role-add/role-add.component';
import { RoleEditComponent } from './container/roles-access/role-edit/role-edit.component';
import { LoginComponent } from './auth/login/login.component';
import { SetPasswordComponent } from './auth/set-password/set-password.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { CalendarComponent } from './container/other/calendar/calendar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ChatComponent } from './container/other/chat/chat.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { AuthGuardService } from './service/auth-guard.service';
import { EmployeesComponent } from './container/employee/employees/employees.component';
import { EmployeeDetailComponent } from './container/employee/employee-detail/employee-detail.component';
import { EmployeeAddComponent } from './container/employee/employee-add/employee-add.component';
import { EmployeeEditComponent } from './container/employee/employee-edit/employee-edit.component';
import { SettingComponent } from './container/other/setting/setting.component';
import { InsuranceComponent } from './container/other/insurance/insurance.component';
import { EmployeeSalaryComponent } from './container/salary/employee-salary/employee-salary.component';
import { PayslipComponent } from './container/salary/payslip/payslip.component';
import { PayslipDetailComponent } from './container/salary/payslip-detail/payslip-detail.component';
import { ContractsComponent } from './container/documents/contracts/contracts.component';
import { ConfirmBoxComponent } from './confirm-box/confirm-box.component';
import { CsvUploadComponent } from './container/employee/csv-upload/csv-upload.component';
import { ContractsAddComponent } from './container/documents/contracts-add/contracts-add.component';
import { InsuranceEditComponent } from './container/other/insurance-edit/insurance-edit.component';
import { InsuranceAddComponent } from './container/other/insurance-add/insurance-add.component';
import { FilterComponent } from './container/employee/filter/filter.component';
import { FaqComponent } from './container/company/faq/faq.component';
import { PrivacyPolicyComponent } from './container/company/privacy-policy/privacy-policy.component';
import { ProfileComponent } from './container/company/profile/profile.component';
import { MatNativeDateModule } from '@angular/material/core';
import { SubAdminListComponent } from './container/sub-admin/sub-admin-list/sub-admin-list.component';
import { SubAdminAddComponent } from './container/sub-admin/sub-admin-add/sub-admin-add.component';
import { SubAdminEditComponent } from './container/sub-admin/sub-admin-edit/sub-admin-edit.component';
import { MissingListComponent } from './container/documents/missing-list/missing-list.component';
import { LeavesListComponent } from './container/leaves/leaves-list/leaves-list.component';
import { LeaveFilterComponent } from './container/leaves/leave-filter/leave-filter.component';
import { ManageLeavesComponent } from './container/leaves/manage-leaves/manage-leaves.component';
import { LeaveAddComponent } from './container/leaves/leave-add/leave-add.component';
import { EmployeeLeaveManageComponent } from './container/leaves/employee-leave-manage/employee-leave-manage.component';
import { PayslipOneComponent } from './container/salary/payslip-one/payslip-one.component';
import { PayslipEditComponent } from './container/salary/payslip-edit/payslip-edit.component';
import { PayslipGenerateComponent } from './container/salary/payslip-generate/payslip-generate.component';
import { DoughnutComponent } from './helpers/chart/doughnut/doughnut.component';
import { ActiveServeyComponent } from './container/survey/active-servey/active-servey.component';
import { AddSurveyComponent } from './container/survey/add-survey/add-survey.component';
import { ViewSurveyComponent } from './container/survey/view-survey/view-survey.component';
import { ListSurveyComponent } from './container/survey/list-survey/list-survey.component';
import { DetailSurveyComponent } from './container/survey/detail-survey/detail-survey.component';
import { VerticalBarComponent } from './helpers/chart/vertical-bar/vertical-bar.component';
import { SharedService } from './service/shared.service';
import { ContractEditComponent } from './container/documents/contracts/contract-edit/contract-edit.component';
import { InitiateSurveyComponent } from './container/survey/initiate-survey/initiate-survey.component';
import { StratSurveyComponent } from './container/survey/strat-survey/strat-survey.component';
import { AgoPipePipe } from './pipe/ago-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    UserRolesComponent,
    AccessComponent,
    RoleAddComponent,
    RoleEditComponent,
    LoginComponent,
    SetPasswordComponent,
    ForgotPasswordComponent,
    CalendarComponent,
    ChatComponent,
    ResetPasswordComponent,
    EmployeesComponent,
    EmployeeDetailComponent,
    EmployeeEditComponent,
    EmployeeAddComponent,
    SettingComponent,
    InsuranceComponent,
    EmployeeSalaryComponent,
    PayslipComponent,
    PayslipDetailComponent,
    ContractsComponent,
    ConfirmBoxComponent,
    CsvUploadComponent,
    ContractsAddComponent,
    InsuranceAddComponent,
    InsuranceEditComponent,
    ProfileComponent,
    FilterComponent,
    FaqComponent,
    PrivacyPolicyComponent,
    SubAdminListComponent,
    SubAdminAddComponent,
    SubAdminEditComponent,
    MissingListComponent,
    LeavesListComponent,
    LeaveFilterComponent,
    ManageLeavesComponent,
    LeaveAddComponent,
    EmployeeLeaveManageComponent,
    PayslipOneComponent,
    PayslipEditComponent,
    PayslipGenerateComponent,
    DoughnutComponent,
    ActiveServeyComponent,
    AddSurveyComponent,
    ViewSurveyComponent,
    ListSurveyComponent,
    DetailSurveyComponent,
    VerticalBarComponent,
    ContractEditComponent,
    InitiateSurveyComponent,
    StratSurveyComponent,
    AgoPipePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    ScheduleModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatTabsModule,
    FormsModule,
    HttpClientModule,
    NgxUiLoaderModule,
    MatSnackBarModule,
    MatChipsModule,
    MatProgressBarModule,
    NgxDropzoneModule,
    MatSlideToggleModule,
    MatExpansionModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    ChartsModule,
    MatMenuModule,
    MatRadioModule,
    MatDialogModule,
    MatTooltipModule,
    MatSelectModule,
    MatTreeModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxDaterangepickerMd.forRoot(),
    NgxMatSelectSearchModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule
  ],
  providers: [{ provide: AuthGuardService, useClass: AuthGuardService }, MatDatepickerModule,SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
