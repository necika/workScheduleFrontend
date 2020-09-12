import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ProfileService {
  private readonly loggedUserUrl: string;

  constructor(private http: HttpClient) {
    this.loggedUserUrl = 'http://localhost:8080/users/getLogged';
  }

  public getLoggedUser(){
    return this.http.get<any>(this.loggedUserUrl);
 }

}