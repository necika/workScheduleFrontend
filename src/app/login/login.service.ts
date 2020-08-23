import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

@Injectable()
export class LoginService {
  private readonly userUrl: string;

  constructor(private http: HttpClient) {
    this.userUrl = 'http://localhost:8080/login';
  }

  public getUser(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.userUrl, {username, password});
  }

}