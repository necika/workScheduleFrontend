import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isSomeoneLoggedInRedirectToLogin } from '../app.component';
import { ChangingUserDataDTO } from '../models/changingUserDataDTO';
import { ProjectDTO } from '../models/projectDTO';
import { TaskDTO } from '../models/taskDTO';
import { UserProfileDTO } from '../models/userProfileDTO';
import { ProjectService } from '../project/project.service';
import { UsersInProjectService } from './users-in-project.service';

@Component({
  selector: 'app-users-in-project',
  templateUrl: './users-in-project.component.html',
  styleUrls: ['./users-in-project.component.css']
})
export class UsersInProjectComponent implements OnInit {
  usersInTeam: Array<UserProfileDTO>;
  displayUserDataFlag: boolean;
  userData: UserProfileDTO;
  projects: Array<ProjectDTO>;
  choosenProject: string;
  choosenTitle: string;
  userDataIndexInTable: number;
  taskName: string;
  taskDescription: string;

  constructor(private service: UsersInProjectService,private projectService: ProjectService,private router: Router) { 
    if(!isSomeoneLoggedInRedirectToLogin()){
      this.router.navigate(['']);
    }
    this.usersInTeam = new Array<UserProfileDTO>();
    this.displayUserDataFlag = false;
    this.userData = new UserProfileDTO();
    this.projects = new Array<ProjectDTO>();
  }

  ngOnInit(): void {
    this.service.getUsersInProject().subscribe(response => this.usersInTeam = response)
    this.projectService.getProjects().subscribe(response => this.projects = response);
  }

  public getUserProfile(id: number){
    this.router.navigate(['/profile'], { queryParams: { id: id } });
  }
  public displayUserData(user: UserProfileDTO, ind:number){
    this.userDataIndexInTable = ind;
    this.userData = user;
    this.displayUserDataFlag = true;
  }
  public addTask(){
    if(this.taskName == undefined || this.taskName == "" || this.taskDescription == "" || this.taskDescription == undefined){
      alert("Fill mandatory fields..")
    }else {
      let taskDTO = new TaskDTO();
      taskDTO.name = this.taskName;
      taskDTO.description = this.taskDescription;
      taskDTO.id = this.userData.id;
      this.service.addTask(taskDTO).subscribe(response => {
        alert("Succesfully added new task..");
        this.displayUserDataFlag = false;
        this.choosenTitle = "";
        this.taskName = "";
        this.taskDescription = "";
      });
    }
  }

  public saveChanges(){
    if(this.choosenTitle != undefined && this.choosenProject != undefined && this.choosenTitle != ""){
      let dto = new ChangingUserDataDTO(this.userData.id,parseInt(this.choosenProject),this.choosenTitle);
      this.service.updateUserData(dto).subscribe(response => {
        alert("Succesfully changed data..")
        window.location.reload();
      })
    }else if((this.choosenTitle == undefined || this.choosenTitle == "") && this.choosenProject != undefined){
      let dto = new ChangingUserDataDTO(this.userData.id,parseInt(this.choosenProject),"");
      this.service.updateUserData(dto).subscribe(response => {
        alert("Succesfully changed data..")
        window.location.reload();
      })
    }else if(this.choosenProject == undefined && this.choosenTitle != undefined && this.choosenTitle != ""){
      let dto = new ChangingUserDataDTO(this.userData.id,0,this.choosenTitle);
      this.service.updateUserData(dto).subscribe(response => {
        alert("Succesfully changed data..")
        this.usersInTeam[this.userDataIndexInTable] = response;
        this.displayUserDataFlag = false;
        this.choosenTitle = "";
      })
    }
    else {
      alert("Fill mandatory fields..");
    }
  }
}
