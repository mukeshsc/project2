import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { LoginComponent } from './auth/login/login.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { CalendarComponent } from './container/calendar/calendar.component';
import { ChatComponent } from './container/chat/chat.component';
import { DashboardComponent } from './container/dashboard/dashboard.component';
import { EmployeeDetailComponent } from './container/employee-detail/employee-detail.component';
import { EmployeesComponent } from './container/employees/employees.component';
import { UserRolesComponent } from './container/roles-access/user-roles/user-roles.component';
import { SettingComponent } from './container/setting/setting.component';
import { AuthGuardService } from './service/auth-guard.service';
import { InsuranceComponent } from './container/insurance/insurance.component';
import { EmployeeSalaryComponent } from './container/employee-salary/employee-salary.component';


const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuardService] },
  { path: 'calendar', component: CalendarComponent,canActivate: [AuthGuardService] },
  { path: 'chat', component: ChatComponent,canActivate: [AuthGuardService] },
  { path: 'employees', component: EmployeesComponent,canActivate: [AuthGuardService] },
  { path: 'employees/:id', component: EmployeeDetailComponent,canActivate: [AuthGuardService] },
  { path: 'user-roles', component: UserRolesComponent,canActivate: [AuthGuardService] },
  { path: 'setting', component: SettingComponent,canActivate: [AuthGuardService] },
  { path: 'insurance', component: InsuranceComponent,canActivate: [AuthGuardService] },
  { path: 'employee-salary', component: EmployeeSalaryComponent,canActivate: [AuthGuardService] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
