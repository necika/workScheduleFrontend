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
    private readonly getTasksByUserUrl: string;
    private readonly getProjectByIdUrl : string;

    constructor(private http: HttpClient){
        this.usersInProjectUrl = 'http://localhost:8080/users/inTeam';
        this.updateUserDataUrl = 'http://localhost:8080/users/change';
        this.getTasksByUserUrl = 'http://localhost:8080/task';
        this.addTaskUrl = 'http://localhost:8080/task';
        this.getProjectByIdUrl = 'http://localhost:8080/project';
    }

    public getUsersInProject(id:number){
        return this.http.get<any>(this.usersInProjectUrl + "/" + id);
    }
    public updateUserData(dto: ChangingUserDataDTO): Observable<any>{
        alert(dto.title)
        return this.http.post<any>(this.updateUserDataUrl,dto);
    }
    public addTask(dto: TaskDTO): Observable<any>{
        return this.http.post<any>(this.addTaskUrl,dto);
    }
    public getTasksByUser(id: number){
        return this.http.get<any>(this.getTasksByUserUrl + "/" + id);
    }
    public getProjectById(id:number){
        return this.http.get<any>(this.getProjectByIdUrl + "/" + id);
    }
}