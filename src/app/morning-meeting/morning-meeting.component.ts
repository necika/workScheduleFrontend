import { Component, OnInit } from '@angular/core';
import { MorningMeetingDTO } from '../models/morningMeetingDTO';
import { MorningMeetingService } from './morning-meeting.service';

@Component({
  selector: 'app-morning-meeting',
  templateUrl: './morning-meeting.component.html',
  styleUrls: ['./morning-meeting.component.css']
})
export class MorningMeetingComponent implements OnInit {
  morningMeeting: MorningMeetingDTO;
  currentDate: string;

  constructor(private morningMeetingService: MorningMeetingService) { 
    this.morningMeeting = new MorningMeetingDTO();
  }

  ngOnInit(): void {
    this.currentDate = this.getCurrentDate();
    this.morningMeetingService.getByToday(this.currentDate).subscribe(response => this.morningMeeting = response);
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
      this.morningMeetingService.saveMorningMeeting(this.morningMeeting,this.currentDate).subscribe(response => alert("You data was sent.."));
    }
  }
}
