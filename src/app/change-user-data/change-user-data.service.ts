import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangeUserDataDTO } from '../models/changeUserDataDTO';


@Injectable()
export class ChangeUserDataService {
    private readonly getUserUrl:string;
    private readonly changeUserDataUrl: string;

    constructor(private http: HttpClient) {
        this.getUserUrl = 'http://localhost:8080/users/';
        this.changeUserDataUrl = 'http://localhost:8080/users/changeSimpleUserData'
    }

    public getUser(id: number){
        return this.http.get<any>(this.getUserUrl + id);
    }

    public changeUserData(userData: ChangeUserDataDTO): Observable<any> {
        return this.http.post<any>(this.changeUserDataUrl,userData);
      }

}