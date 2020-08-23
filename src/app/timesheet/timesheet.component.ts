import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  private convertDateStringToTime(value:string){
    let returnValue = "";
    let strArray = value.split("T");
    let timeArray = strArray[1].split(":");
    returnValue = timeArray[0] + ":" + timeArray[1];
    return returnValue;
  }
}
