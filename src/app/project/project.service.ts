import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddUserToProjectDTO } from '../models/addUserToProjectDTO';


@Injectable()
export class ProjectService {
    private readonly getAllUrl: string;
    private readonly removeUrl: string;
    private readonly getAllUsersUrl: string;
    private readonly addUserToProjectUrl: string;
    private readonly removeUserFromProjectUrl: string;

    constructor(private http: HttpClient) {
        this.getAllUrl = 'http://localhost:8080/project';
        this.removeUrl = 'http://localhost:8080/project/';
        this.getAllUsersUrl = 'http://localhost:8080/users';
        this.addUserToProjectUrl = 'http://localhost:8080/project/addUser';
        this.removeUserFromProjectUrl = 'http://localhost:8080/project/removeUserFromProject';
    }

    public getProjects(){
        return this.http.get<any>(this.getAllUrl);
    }

    public getUsers(){
        return this.http.get<any>(this.getAllUsersUrl);
    }

    public removeProject(id: number){
        return this.http.get<any>(this.removeUrl + 'remove/' + id);
    }

    public addUserToProject(value: AddUserToProjectDTO): Observable<any> {
        return this.http.post<any>(this.addUserToProjectUrl, value);
    }

    public removeUserFromProject(value: AddUserToProjectDTO): Observable<any> {
        return this.http.post<any>(this.removeUserFromProjectUrl, value);
    }
}