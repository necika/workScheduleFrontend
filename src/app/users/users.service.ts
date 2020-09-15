import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { AddUsersDTO } from '../models/addUsersDTO';

@Injectable()
export class UsersService {
  private readonly addUserUrl: string;
  private readonly removeUserUrl: string;
  private readonly editUserUrl: string;

  constructor(private http: HttpClient) {
    this.addUserUrl = 'http://localhost:8080/users';
    this.removeUserUrl = 'http://localhost:8080/users/delete';
    this.editUserUrl = 'http://localhost:8080/users/edit';
  }

  public addUser(user: AddUsersDTO): Observable<any> {
    return this.http.post<any>(this.addUserUrl, user);
  }
  public removeUser(id: number){
     return this.http.delete<any>(this.removeUserUrl + '/' + id, null);
  }
  public editUser(id: number){
      return this.http.put<any>(this.editUserUrl + '/' + id , null);
  }
}