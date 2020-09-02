import { Component, OnInit } from '@angular/core';
import { TimesheetService } from './timesheet.service';
import { TimesheetEntryDTO } from '../models/timesheetEntryDTO';

//TREBA DA SE SNIMA KAKO UTC VREMEA A DA SE UCITAVA KAO LOCAL TIME
// sta se desi ako je decembar zbog ovog + 1, ima dole komentar gde treba pogledati
//Pogledati svu mogucu validaciju za sve kako se ponasa
@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit {
  currentMonth: string;
  timesheetEntries: Set<TimesheetEntryDTO>;
  monthId: number;
  userId: number;

  constructor(private timesheetService: TimesheetService) {
    this.timesheetEntries = new Set<TimesheetEntryDTO>();
  }

  ngOnInit(): void {
    this.currentMonth = this.getCurrentMonth();
    this.timesheetService.getAllByMonth(this.currentMonth).subscribe(response => this.timesheetEntries = response);
    this.timesheetService.getMonthId(this.currentMonth).subscribe(response => this.monthId = response);
    this.timesheetService.getUserId(this.currentMonth).subscribe(response => this.userId = response);
  }

  public addTimesheetEntryForNewDay(){
    let newTsEntry;
    let tsArray = [...this.timesheetEntries];
    if(tsArray.length == 0 || this.timesheetEntries == null){
      
      newTsEntry = new TimesheetEntryDTO(1,"","","","",0,true,this.userId,this.monthId);
    }else {
      let lastEntry = tsArray[tsArray.length - 1];
      let days = lastEntry.day;
      days++;
     
      newTsEntry = new TimesheetEntryDTO(days,"","","","",0,true,this.userId,this.monthId);
    }
    tsArray.splice(tsArray.length,0,newTsEntry);
    this.timesheetEntries = new Set(tsArray);
  }

  public addTimesheetEntryForSameDay(tsEntry: any,index: number){
    let isValid = document.getElementsByTagName("small").length == 0;
    if(isValid && tsEntry.id != undefined && tsEntry.id != null){
      let position = tsEntry.position;
      position++;
      let newTsEntry = new TimesheetEntryDTO(tsEntry.day,"","","","",position,true,tsEntry.userId,tsEntry.tsMonthId);
      let array = [...this.timesheetEntries];
      array.splice(index+1,0,newTsEntry);
      this.timesheetEntries = new Set(array);
    }
  }
  public choosingMonthChangeListener(event: any){
    this.timesheetService.getAllByMonth(event.target.value).subscribe(response => this.timesheetEntries = response);
  }
  public saveTimesheetEntry(tsEntry: TimesheetEntryDTO){
    let isValid = document.getElementsByTagName("small").length == 0;
    if(isValid){
      this.timesheetService.saveTimesheet(tsEntry).subscribe(response => {
        tsEntry.changed = false;
        tsEntry.id = response.id;
      });
    }
  }
  public getMinutes(value: string){
    if(value == "" || value == undefined){
        return -1;
    }
    let splitString = value.split(":")
    let hours = parseInt(splitString[0]);
    let minutes = parseInt(splitString[1]);
    return hours*60 + minutes; 
  }

  private getCurrentMonth(){
    let currentDate = new Date(); // sta se desi ako je decembar zbog ovog + 1, to proveriti kako se ponasa
    let currentMonth = currentDate.getMonth();
    if(currentMonth < 9){
      return currentDate.getFullYear() + "-0" + (currentMonth + 1)
    }
    return currentDate.getFullYear() + "-" + (currentMonth + 1);
  }

  private convertDateStringToTime(value:string){
    let returnValue = "";
    let strArray = value.split("T");
    let timeArray = strArray[1].split(":");
    returnValue = timeArray[0] + ":" + timeArray[1];
    return returnValue;
  }
}
