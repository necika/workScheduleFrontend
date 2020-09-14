import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { AddProjectDTO } from '../models/addProjectDTO';

@Injectable()
export class AddProjectService {
  private readonly getTeamLeadersUrl: string;
  private readonly getAllusersUrl: string;
  private readonly addProjectUrl: string;

  constructor(private http: HttpClient) {
    this.getTeamLeadersUrl = 'http://localhost:8080/users/getTeamLeaders';
    this.getAllusersUrl = 'http://localhost:8080/users';
    this.addProjectUrl = 'http://localhost:8080/project';
  }

  public getTeamLeaders(){
    return this.http.get<any>(this.getTeamLeadersUrl);
  }
  public getAllUsers(){
    return this.http.get<any>(this.getAllusersUrl);
  }
  public addProject(addProject: AddProjectDTO): Observable<any> {
    return this.http.post<any>(this.addProjectUrl,addProject);
  }
}