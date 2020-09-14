import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class ProjectService {
    private readonly getAllUrl: string;
    private readonly removeUrl: string;

    constructor(private http: HttpClient) {
        this.getAllUrl = 'http://localhost:8080/project';
        this.removeUrl = 'http://localhost:8080/project/';
    }

    public getProjects(){
        return this.http.get<any>(this.getAllUrl);
    }

    public removeProject(id: number){
        return this.http.get<any>(this.removeUrl + 'remove/' + id);
    }

}