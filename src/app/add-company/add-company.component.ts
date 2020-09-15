import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isSomeoneLoggedInRedirectToLogin } from '../app.component';
import { AddCompanyDTO } from '../models/addCompanyDTO';
import { AddCompanyService } from './add-company.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {
  companyName : string;
  companyDescription : string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  age: number;

  constructor(private service: AddCompanyService,private router:Router) { 
    if(!isSomeoneLoggedInRedirectToLogin()){
      this.router.navigate(['']);
    }
  }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.companyName == null || this.companyName == "" || this.companyDescription == null || this.companyDescription == "" || 
      this.username == null || this.username == "" || this.password == null || this.password == "" || this.firstName == null
      || this.firstName == "" || this.lastName == "" || this.lastName == null || this.age == null || this.age == undefined){
      alert("Fill mandatory fields !");
    }else {
      let addCompanyDTO = new AddCompanyDTO(this.companyName,this.companyDescription,this.username,this.password,this.firstName,this.lastName,this.age);
    this.service.addCompany(addCompanyDTO).subscribe(response => {
      alert("Succesfully added new company..");
      window.location.reload()
    });
    }
  }
}
