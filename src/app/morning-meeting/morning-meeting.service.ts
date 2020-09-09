import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MorningMeetingDTO } from '../models/morningMeetingDTO';
import { Observable } from 'rxjs';


@Injectable()
export class MorningMeetingService {
    private readonly getTodayMorningMeetingUrl: string;
    private readonly saveMeetingUrl: string;
    
    constructor(private http: HttpClient) {
        this.getTodayMorningMeetingUrl = 'http://localhost:8080/morningMeeting/byToday';
        this.saveMeetingUrl = 'http://localhost:8080/morningMeeting/'
    }

    public getByToday(date: string){
        return this.http.get<any>(this.getTodayMorningMeetingUrl+"/"+date);
    }

    public saveMorningMeeting(meeting: MorningMeetingDTO,date:string): Observable<any> {
        return this.http.post<any>(this.saveMeetingUrl+date, meeting);
      }
}