import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { ChangingUserDataDTO } from '../models/changingUserDataDTO';
import { TaskDTO } from '../models/taskDTO';

@Injectable()
export  class UsersInProjectService {
    private readonly  usersInProjectUrl: string;
    private readonly  updateUserDataUrl: string;
    private readonly  addTaskUrl: string;

    constructor(private http: HttpClient){
        this.usersInProjectUrl = 'http://localhost:8080/users/inTeam';
        this.updateUserDataUrl = 'http://localhost:8080/users/change';
        this.addTaskUrl = 'http://localhost:8080/task'
    }

    public getUsersInProject(){
        return this.http.get<any>(this.usersInProjectUrl);
    }
    public updateUserData(dto: ChangingUserDataDTO): Observable<any>{
        return this.http.post<any>(this.updateUserDataUrl,dto);
    }
    public addTask(dto: TaskDTO): Observable<any>{
        return this.http.post<any>(this.addTaskUrl,dto);
    }
}