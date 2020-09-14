import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskDTO } from '../models/taskDTO';

@Injectable()
export class TaskService {
    private readonly getTasksUrl : string;
    private readonly changeToActiveUrl: string;
    private readonly changeToClosedUrl: string;

    constructor(private http: HttpClient) {
        this.getTasksUrl = 'http://localhost:8080/task';
        this.changeToActiveUrl = 'http://localhost:8080/task/changeToActive';
        this.changeToClosedUrl = 'http://localhost:8080/task/changeToClosed';
    }

    public getTasks(){
        return this.http.get<any>(this.getTasksUrl);
    }
    public changeToActive(task: TaskDTO): Observable<any> {
        return this.http.post<any>(this.changeToActiveUrl, task);
    }
    public changeToClosed(task: TaskDTO): Observable<any> {
        return this.http.post<any>(this.changeToClosedUrl, task);
    }

}