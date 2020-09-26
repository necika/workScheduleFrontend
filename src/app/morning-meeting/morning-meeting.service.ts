import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MorningMeetingDTO } from '../models/morningMeetingDTO';
import { Observable } from 'rxjs';


@Injectable()
export class MorningMeetingService {
    private readonly getTodayMorningMeetingUrl: string;
    private readonly saveMeetingUrl: string;
    private readonly getTasksUrl: string;

    
    constructor(private http: HttpClient) {
        this.getTodayMorningMeetingUrl = 'http://localhost:8080/morningMeeting/byToday';
        this.saveMeetingUrl = 'http://localhost:8080/morningMeeting/'
        this.getTasksUrl = 'http://localhost:8080/task'
    }

    public getByToday(date: string){
        return this.http.get<any>(this.getTodayMorningMeetingUrl+"/"+date);
    }

    public getTasks(){
        return this.http.get<any>(this.getTasksUrl);
    }

    public saveMorningMeeting(meeting: MorningMeetingDTO,date:string): Observable<any> {
        return this.http.post<any>(this.saveMeetingUrl+date, meeting);
      }
}