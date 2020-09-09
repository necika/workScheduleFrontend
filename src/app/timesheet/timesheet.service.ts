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
  private readonly getMonthIdUrl : string;
  private readonly getUserIdUrl : string;

  constructor(private http: HttpClient) {
    this.removeTimesheetUrl = 'http://localhost:8080/timesheetEntry/delete';
    this.editTimesheetUrl = 'http://localhost:8080/timesheetEntry/edit';
    this.getAllByMonthUrl = 'http://localhost:8080/timesheetEntry/byMonth';
    this.getMonthIdUrl = 'http://localhost:8080/timesheetMonth/getId';
    this.saveTimesheetEntry = 'http://localhost:8080/timesheetEntry';
    this.getUserIdUrl = 'http://localhost:8080/users/getId';
  }

  public saveTimesheet(entry: TimesheetEntryDTO): Observable<any> {
    return this.http.post<any>(this.saveTimesheetEntry, entry);
  }
  public removeTimesheet(id: number){
     return this.http.get<any>(this.removeTimesheetUrl + '/' + id);
  }
  public editTimesheet(id: number){
      return this.http.put<any>(this.editTimesheetUrl + '/' + id , null);
  }
  public getAllByMonth(value: string){
    return this.http.get<any>(this.getAllByMonthUrl + '/' + value);
  }
  public getMonthId(value: string){
    return this.http.get<any>(this.getMonthIdUrl + '/' + value);
  }
  public getUserId(value: string){
    return this.http.get<any>(this.getUserIdUrl + '/' + value);
  }
}