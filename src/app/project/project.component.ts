import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isSomeoneLoggedInRedirectToLogin } from '../app.component';
import { AddUserToProjectDTO } from '../models/addUserToProjectDTO';
import { ProjectDTO } from '../models/projectDTO';
import { UserProfileDTO } from '../models/userProfileDTO';
import { ProjectService } from './project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  projects: Array<ProjectDTO>;
  users: Array<UserProfileDTO>;
  userId:number;
  projectId:number;
  
  constructor(private projectService: ProjectService,private router: Router) {
    if(!isSomeoneLoggedInRedirectToLogin()){
      this.router.navigate(['']);
    }
    this.users = new Array<UserProfileDTO>();
   }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(response => this.projects = response);
    this.projectService.getUsers().subscribe(response => this.users = response);
  }

  get teamLeaderLoggedIn(){
    let user = localStorage.getItem('user')
    if (user === null){
      return false;
    }
    else {
      let userJson = JSON.parse(user);
      if(userJson.userType === "LEADER"){
        return true;
      }
      return false;
    }
  }
  get adminLoggedIn(){
    let user = localStorage.getItem('user')
    if (user === null){
      return false;
    }
    else {
      let userJson = JSON.parse(user);
      if(userJson.userType === "ADMIN"){
        return true;
      }
      return false;
    }
  }
  public getUsersInProject(id:number){
    this.router.navigate(['/usersInProject'], { queryParams: { id: id } });
  }
  public addNewUserProject(){
    if(this.userId != undefined || this.projectId != undefined){
      let value = new AddUserToProjectDTO();
      value.userId = this.userId;
      value.projectId = this.projectId;
      this.projectService.addUserToProject(value).subscribe(repsonse => {
        alert("User is added.");
        window.location.reload();
      });
    }
    else {
      alert("Fill mandatory fields.");
    }
  }
  public deleteUserFromProject(userId: number,projectId:number){
    let value = new AddUserToProjectDTO();
    value.projectId = projectId;
    value.userId = userId;
    this.projectService.removeUserFromProject(value).subscribe(response => {
      alert("User is removed.");
      window.location.reload();
    });
  }
  public displayChangingUserDataPage(id: number){
    this.router.navigate(['/changeUserData'], { queryParams: { id: id } });
  }
  public displayUserProfiel(id: number){
    this.router.navigate(['/profile'], { queryParams: { id: id } });
  }
}
