import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ProfileService {
  private readonly loggedUserUrl: string;
  private readonly getUserProfileUrl: string;

  constructor(private http: HttpClient) {
    this.loggedUserUrl = 'http://localhost:8080/users/getLogged';
    this.getUserProfileUrl = 'http://localhost:8080/users/'
  }

  public getLoggedUser(){
    return this.http.get<any>(this.loggedUserUrl);
  }

  public getUserProfile(id: number){
    return this.http.get<any>(this.getUserProfileUrl + id);
  }

}