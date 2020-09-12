import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddCompanyDTO } from '../models/addCompanyDTO';

@Injectable()
export class AddCompanyService {
    private readonly addCompanyUrl: string;

    constructor(private http: HttpClient) {
        this.addCompanyUrl = 'http://localhost:8080/company';
    }

    public addCompany(companyDTO: AddCompanyDTO): Observable<any> {
        return this.http.post<any>(this.addCompanyUrl,companyDTO);
    }
}