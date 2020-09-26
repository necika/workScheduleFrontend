import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isSomeoneLoggedInRedirectToLogin } from 'src/app/app.component';
import { AddUsersDTO } from 'src/app/models/addUsersDTO';
import { ProjectDTO } from 'src/app/models/projectDTO';
import { ProjectService } from 'src/app/project/project.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-addUsers',
  templateUrl: './addUsers.component.html',
  styleUrls: ['./addUsers.component.css']
})
export class AddUsersComponent implements OnInit {
  projects: Array<ProjectDTO>;
  username:string;
  firstName:string;
  lastName:string;
  age:number;
  password:string;
  choosenProject:string;
  choosenTitle:string;
  choosenUserType:string;
  
  constructor(private service:UsersService,private projectService:ProjectService,private router: Router) {
    if(!isSomeoneLoggedInRedirectToLogin()){
      this.router.navigate(['']);
    }
    this.projects = new Array<ProjectDTO>();
   }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(response => this.projects = response);
  }

  onSubmit(){
    if(this.username == undefined || this.firstName == undefined || this.lastName == undefined || this.age == undefined || this.password == undefined || this.choosenProject == undefined 
    || this.lastName == "" || this.username == "" || this.firstName == "" || this.password == "" || this.choosenProject == "" || this.choosenTitle == undefined || this.choosenTitle == "" || this.choosenUserType == undefined || this.choosenUserType == ""){
      alert("Fill mandatory fields..")
    }else {
      let user = new AddUsersDTO();
      user.age = this.age;
      user.email = this.username;
      user.firstName = this.firstName;
      user.lastName = this.lastName;
      user.jobTitle = this.choosenTitle;
      user.projectId = parseInt(this.choosenProject);
      user.password = this.password;
      user.userType = this.choosenUserType;
      this.service.addUser(user).subscribe(response => this.router.navigate(['/projects']));
    }
  }

}