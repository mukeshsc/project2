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

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './common/header/header.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { DashboardComponent } from './container/dashboard/dashboard.component';
import { UserRolesComponent } from './container/roles-access/user-roles/user-roles.component';
import { AccessComponent } from './container/roles-access/access/access.component';
import { RoleAddComponent } from './container/roles-access/role-add/role-add.component';
import { RoleEditComponent } from './container/roles-access/role-edit/role-edit.component';
import { LoginComponent } from './auth/login/login.component';
import { SetPasswordComponent } from './auth/set-password/set-password.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { CalendarComponent } from './container/calendar/calendar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ChatComponent } from './container/chat/chat.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AuthGuardService } from './service/auth-guard.service';
import { EmployeesComponent } from './container/employees/employees.component';
import { EmployeeDetailComponent } from './container/employee-detail/employee-detail.component';
import { EmployeeAddComponent } from './container/employee-add/employee-add.component';
import { EmployeeEditComponent } from './container/employee-edit/employee-edit.component';
import { SettingComponent } from './container/setting/setting.component';
import { InsuranceComponent } from './container/insurance/insurance.component';
import { EmployeeSalaryComponent } from './container/employee-salary/employee-salary.component';
import { PayslipComponent } from './container/payslip/payslip.component';
import { PayslipDetailComponent } from './container/payslip-detail/payslip-detail.component';
import { ContractsComponent } from './container/documents/contracts/contracts.component';

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
    ContractsComponent
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
    MatSortModule
  ],
  providers: [{ provide: AuthGuardService, useClass: AuthGuardService }],
  bootstrap: [AppComponent]
})
export class AppModule { }
