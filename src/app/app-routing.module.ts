import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { LoginComponent } from './auth/login/login.component';
import { SetPasswordComponent } from './auth/set-password/set-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { CalendarComponent } from './container/other/calendar/calendar.component';
import { ChatComponent } from './container/other/chat/chat.component';
import { DashboardComponent } from './container/other/dashboard/dashboard.component';
import { EmployeeDetailComponent } from './container/employee/employee-detail/employee-detail.component';
import { EmployeesComponent } from './container/employee/employees/employees.component';
import { UserRolesComponent } from './container/roles-access/user-roles/user-roles.component';
import { AccessComponent } from './container/roles-access/access/access.component';
import { SettingComponent } from './container/other/setting/setting.component';
import { AuthGuardService } from './service/auth-guard.service';
import { InsuranceComponent } from './container/other/insurance/insurance.component';
import { EmployeeSalaryComponent } from './container/salary/employee-salary/employee-salary.component';
import { PayslipComponent } from './container/salary/payslip/payslip.component';
import { PayslipDetailComponent } from './container/salary/payslip-detail/payslip-detail.component';
import { ContractsComponent } from './container/documents/contracts/contracts.component';
import { FaqComponent } from './container/company/faq/faq.component';
import { PrivacyPolicyComponent } from './container/company/privacy-policy/privacy-policy.component';
import { ProfileComponent } from './container/company/profile/profile.component';
import { SubAdminListComponent } from './container/sub-admin/sub-admin-list/sub-admin-list.component';
import { LeavesListComponent } from './container/leaves/leaves-list/leaves-list.component';
import { PayslipEditComponent } from './container/salary/payslip-edit/payslip-edit.component';
import { PayslipGenerateComponent } from './container/salary/payslip-generate/payslip-generate.component';
import { ActiveServeyComponent } from './container/survey/active-servey/active-servey.component';
import { AddSurveyComponent } from './container/survey/add-survey/add-survey.component';
import { ListSurveyComponent } from './container/survey/list-survey/list-survey.component';
import { DetailSurveyComponent } from './container/survey/detail-survey/detail-survey.component';
import { InitiateSurveyComponent } from './container/survey/initiate-survey/initiate-survey.component';


const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'set-password/:key', component: SetPasswordComponent },
  { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuardService] },
  { path: 'calendar', component: CalendarComponent,canActivate: [AuthGuardService] },
  { path: 'chat', component: ChatComponent,canActivate: [AuthGuardService] },
  { path: 'employees', component: EmployeesComponent,canActivate: [AuthGuardService] },
  { path: 'employees/:id', component: EmployeeDetailComponent,canActivate: [AuthGuardService] },
  { path: 'user-roles', component: UserRolesComponent,canActivate: [AuthGuardService] },
  { path: 'access', component: AccessComponent,canActivate: [AuthGuardService] },
  { path: 'setting', component: SettingComponent,canActivate: [AuthGuardService] },
  { path: 'insurance', component: InsuranceComponent,canActivate: [AuthGuardService] },
  { path: 'employee-salary', component: EmployeeSalaryComponent,canActivate: [AuthGuardService] },
  { path: 'payslip', component: PayslipComponent,canActivate: [AuthGuardService] },
  { path: 'payslip/:id', component: PayslipDetailComponent,canActivate: [AuthGuardService] },
  { path: 'payslip-edit/:id', component: PayslipEditComponent,canActivate: [AuthGuardService] },
  { path: 'payslip-generate', component: PayslipGenerateComponent,canActivate: [AuthGuardService] },
  { path: 'contracts', component: ContractsComponent,canActivate: [AuthGuardService] },
  { path: 'faq', component: FaqComponent,canActivate: [AuthGuardService] },
  { path: 'profile', component: ProfileComponent,canActivate: [AuthGuardService] },
  { path: 'privacy-policy', component: PrivacyPolicyComponent,canActivate: [AuthGuardService] },
  { path: 'sub-admin', component: SubAdminListComponent,canActivate: [AuthGuardService] },
  { path: 'leaves', component: LeavesListComponent,canActivate: [AuthGuardService] },
  { path: 'active-survey/:id', component: ActiveServeyComponent,canActivate: [AuthGuardService] },
  { path: 'add-survey', component: AddSurveyComponent,canActivate: [AuthGuardService] },
  { path: 'survey-list', component: ListSurveyComponent,canActivate: [AuthGuardService] },
  { path: 'survey-detail/:id', component: DetailSurveyComponent,canActivate: [AuthGuardService] },
  { path: 'survey-initiate', component: InitiateSurveyComponent,canActivate: [AuthGuardService] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
