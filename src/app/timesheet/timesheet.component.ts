import { Component, OnInit } from '@angular/core';
import { TimesheetService } from './timesheet.service';
import { TimesheetEntryDTO } from '../models/timesheetEntryDTO';
import { Router } from '@angular/router';
import { isSomeoneLoggedInRedirectToLogin } from '../app.component';

//TREBA DA SE SNIMA KAKO UTC VREMEA A DA SE UCITAVA KAO LOCAL TIME
// sta se desi ako je decembar zbog ovog + 1, ima dole komentar gde treba pogledati
//Pogledati svu mogucu validaciju za sve kako se ponasa
//position atribut mislim da ne radi nista
//dugme za novi dan onemoguciti ako smo uneli tipa 31 dan i nema vise u tom mesecu
@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit {
  currentMonth: string;
  timesheetEntries: Array<TimesheetEntryDTO>;
  monthId: number;
  userId: number;

  constructor(private timesheetService: TimesheetService,private router: Router) {
    if(!isSomeoneLoggedInRedirectToLogin()){
      this.router.navigate(['']);
    }
    this.timesheetEntries = new Array<TimesheetEntryDTO>();
  }

  ngOnInit(): void {
    this.currentMonth = this.getCurrentMonth();
    this.timesheetService.getAllByMonth(this.currentMonth).subscribe(response => {
      this.timesheetEntries = response
      this.timesheetService.getMonthId(this.currentMonth).subscribe(response => this.monthId = response);
      this.timesheetService.getUserId(this.currentMonth).subscribe(response => this.userId = response);
    });
  }
  public dayDisplaying(timesheetEntries: any,i:number){
    if(i == 0){
      return true;
    }else {
      if(timesheetEntries[i].day !== timesheetEntries[i-1].day){
        return true;
      }
    }
    return false;
  }

  public removeTimesheetEntry(tsEntry: any,index: number){
    if(tsEntry.id == undefined){
      this.timesheetEntries.splice(index, 1);
    }else {
      if(this.isValid()){
        this.timesheetService.removeTimesheet(tsEntry.id).subscribe(response => {
          this.timesheetEntries.splice(index,1);
        });
      }
    }
  }

  public addTimesheetEntryForNewDay(){
    let newTsEntry;
    if(this.isValid()){
      let tsArray = [...this.timesheetEntries];
      if(tsArray.length == 0 || this.timesheetEntries == null){
        newTsEntry = {
            day: 1,
            task: "",
            description: "",
            startTime: "",
            endTime: "",
            position: 0,
            changed: true,
            userId: this.userId,
            tsMonthId: this.monthId
        };
      }else {
        let lastEntry = tsArray[tsArray.length - 1];
        let days = lastEntry.day;
        days++;
        newTsEntry = {
          day: days,
          task: "",
          description: "",
          startTime: "",
          endTime: "",
          position: 0,
          changed: true,
          userId: this.userId,
          tsMonthId: this.monthId
      };
      }
      tsArray.splice(tsArray.length,0,newTsEntry);
      this.timesheetEntries = tsArray;
    }else {
      alert("Finish or remove current entry..");
    }
  }

  public getToolTipTitle(tsEntry: any){
    let dayString = tsEntry.day;
    if(tsEntry.day < 10){
      dayString = "0" + tsEntry.day;
    }
    return this.currentMonth + "-" + dayString;
  }

  public isValid() {
    let isValid = document.getElementsByTagName("small").length == 0;
    return isValid;
  }

  public addTimesheetEntryForSameDay(tsEntry: any,index: number){
    if(this.isValid() && tsEntry.id != undefined && tsEntry.id != null){
      let position = tsEntry.position;
      position++;
      let newTsEntry = new TimesheetEntryDTO(tsEntry.day,"","","","",position,true,tsEntry.userId,tsEntry.tsMonthId);
      let array = [...this.timesheetEntries];
      array.splice(index+1,0,newTsEntry);
      this.timesheetEntries = array;
    }else {
      alert("Finish or remove current entry..");
    }
  }
  public choosingMonthChangeListener(event: any){
    this.timesheetService.getAllByMonth(event.target.value).subscribe(response => this.timesheetEntries = response);
  }
  public saveTimesheetEntry(tsEntry: TimesheetEntryDTO){
    if(this.isValid()){
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
      return currentDate.getFullYear() + "-0" + (currentMonth + 1);
    }
    return currentDate.getFullYear() + "-" + (currentMonth + 1);
  }
}
