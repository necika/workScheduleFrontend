import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { LoginService } from './login/login.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Interceptor } from './interceptor/Interceptor';
import { FormsModule } from '@angular/forms';
import { TimesheetService } from './timesheet/timesheet.service';
import { UsersService } from './users/users.service';
import { MorningMeetingComponent } from './morning-meeting/morning-meeting.component';
import { MorningMeetingService } from './morning-meeting/morning-meeting.service';
import { AddCompanyComponent } from './add-company/add-company.component';
import { AddCompanyService } from './add-company/add-company.service';
import { ProfileComponent } from './profile/profile.component';
import { ProfileService } from './profile/profile.service';
import { ProjectComponent } from './project/project.component';
import { ProjectService } from './project/project.service';
import { AddProjectComponent } from './add-project/add-project.component';
import { AddProjectService } from './add-project/add-project.service';
import { UsersInProjectComponent } from './users-in-project/users-in-project.component';
import { UsersInProjectService } from './users-in-project/users-in-project.service';
import { TasksComponent } from './tasks/tasks.component';
import { TaskService } from './tasks/tasks.service';
import { AddUsersComponent } from './users/addUsers/addUsers.component';
import { ChangeUserDataComponent } from './change-user-data/change-user-data.component';
import { ChangeUserDataService } from './change-user-data/change-user-data.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TimesheetComponent,
    MorningMeetingComponent,
    AddCompanyComponent,
    ProfileComponent,
    ProjectComponent,
    AddProjectComponent,
    UsersInProjectComponent,
    TasksComponent,
    AddUsersComponent,
    ChangeUserDataComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    LoginService,
    TimesheetService,
    UsersService,
    MorningMeetingService,
    AddCompanyService,
    ProfileService,
    ProjectService,
    AddProjectService,
    UsersInProjectService,
    TaskService,
    ChangeUserDataService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
