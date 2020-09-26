import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { AddUsersComponent } from './users/addUsers/addUsers.component';
import { MorningMeetingComponent } from './morning-meeting/morning-meeting.component';
import { AddCompanyComponent } from './add-company/add-company.component';
import { ProfileComponent } from './profile/profile.component';
import { ProjectComponent } from './project/project.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { UsersInProjectComponent } from './users-in-project/users-in-project.component';
import { TasksComponent } from './tasks/tasks.component';
import { ChangeUserDataComponent } from './change-user-data/change-user-data.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'timesheet', component: TimesheetComponent },
  { path: 'users/add', component: AddUsersComponent },
  { path: 'morningMeeting', component: MorningMeetingComponent },
  { path: 'company/add', component: AddCompanyComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'projects', component: ProjectComponent },
  { path: 'projects/add', component: AddProjectComponent },
  { path: 'usersInProject', component: UsersInProjectComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'changeUserData', component: ChangeUserDataComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
