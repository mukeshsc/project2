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


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './common/header/header.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { DashboardComponent } from './container/dashboard/dashboard.component';
import { UserRolesComponent } from './container/roles-access/user-roles/user-roles.component';
import { LoginComponent } from './auth/login/login.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { CalendarComponent } from './container/calendar/calendar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ChatComponent } from './container/chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    UserRolesComponent,
    LoginComponent,
    ForgotPasswordComponent,
    CalendarComponent,
    ChatComponent
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
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
