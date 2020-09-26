import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isSomeoneLoggedInRedirectToLogin } from '../app.component';
import { MorningMeetingDTO } from '../models/morningMeetingDTO';
import { TaskDTO } from '../models/taskDTO';
import { MorningMeetingService } from './morning-meeting.service';

@Component({
  selector: 'app-morning-meeting',
  templateUrl: './morning-meeting.component.html',
  styleUrls: ['./morning-meeting.component.css']
})
export class MorningMeetingComponent implements OnInit {
  morningMeeting: MorningMeetingDTO;
  currentDate: string;
  tasks: Array<TaskDTO>;

  yesterdayTasks: Array<number>;
  todayTasks: Array<number>;
  problemTasks: Array<number>;

  constructor(private morningMeetingService: MorningMeetingService,private router: Router) { 
    if(!isSomeoneLoggedInRedirectToLogin()){
      this.router.navigate(['']);
    }
    this.morningMeeting = new MorningMeetingDTO();
    this.tasks = new Array<TaskDTO>();
    this.yesterdayTasks = new Array<number>();
    this.todayTasks = new Array<number>();
    this.problemTasks = new Array<number>();
  }


  ngOnInit(): void {
    this.currentDate = this.getCurrentDate();
    this.morningMeetingService.getByToday(this.currentDate).subscribe(response => {
      this.morningMeeting = response;
    });
    this.morningMeetingService.getTasks().subscribe(response => this.tasks = response);
  }

  private getCurrentDate(){
    let date = new Date();
    let month = date.getMonth();
    month++;
    return date.getFullYear()+"-"+month+"-"+date.getDate();
  }
  public sendData(){
    if(this.morningMeeting.today == "" || this.morningMeeting.yesterday == "" 
      || this.morningMeeting.today == undefined || this.morningMeeting.yesterday == undefined){
        alert("Fill mandatory fields..");
    }else {
      this.morningMeetingService.saveMorningMeeting(this.morningMeeting,this.currentDate).subscribe(response => {
        alert("You data was sent..");
        this.morningMeeting = response;
    });
    }
  }
}
