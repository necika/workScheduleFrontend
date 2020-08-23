import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

@Injectable()
export class TimesheetService {
  private readonly addTimesheetUrl: string;
  private readonly removeTimesheetUrl: string;
  private readonly editTimesheetUrl: string;

  constructor(private http: HttpClient) {
    this.addTimesheetUrl = 'http://localhost:8080/timesheet/add';
    this.removeTimesheetUrl = 'http://localhost:8080/timesheet/delete';
    this.editTimesheetUrl = 'http://localhost:8080/timesheet/edit';
  }

  public addTimesheet(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.addTimesheetUrl, {username, password});
  }
  public removeTimesheet(id: number){
     return this.http.delete<any>(this.removeTimesheetUrl + '/' + id, null);
  }
  public editTimesheet(id: number){
      return this.http.put<any>(this.editTimesheetUrl + '/' + id , null);
  }
}