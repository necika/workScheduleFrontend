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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TimesheetComponent,
    MorningMeetingComponent,
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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
