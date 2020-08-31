import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { TimesheetEntryDTO } from '../models/timesheetEntryDTO';

@Injectable()
export class TimesheetService {
  private readonly removeTimesheetUrl: string;
  private readonly editTimesheetUrl: string;
  private readonly getAllByMonthUrl : string;
  private readonly saveTimesheetEntry : string;

  constructor(private http: HttpClient) {
    this.removeTimesheetUrl = 'http://localhost:8080/timetimesheetEntrysheet/delete';
    this.editTimesheetUrl = 'http://localhost:8080/timesheetEntry/edit';
    this.getAllByMonthUrl = 'http://localhost:8080/timesheetEntry/byMonth';
    this.saveTimesheetEntry = 'http://localhost:8080/timesheetEntry'
  }

  public saveTimesheet(entry: TimesheetEntryDTO): Observable<any> {
    return this.http.post<any>(this.saveTimesheetEntry, entry);
  }
  public removeTimesheet(id: number){
     return this.http.delete<any>(this.removeTimesheetUrl + '/' + id, null);
  }
  public editTimesheet(id: number){
      return this.http.put<any>(this.editTimesheetUrl + '/' + id , null);
  }
  public getAllByMonth(value: string){
    return this.http.get<any>(this.getAllByMonthUrl + '/' + value);
  }
}