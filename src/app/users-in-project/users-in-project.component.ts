import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  displayUserTasksFlag: boolean;
  userData: UserProfileDTO;
  choosenTitle: string;
  userDataIndexInTable: number;
  taskName: string;
  taskDescription: string;
  projectName: string;
  tasks: Array<TaskDTO>;

  constructor(private service: UsersInProjectService,private projectService: ProjectService,private router: Router,private route: ActivatedRoute) { 
    if(!isSomeoneLoggedInRedirectToLogin()){
      this.router.navigate(['']);
    }
    this.usersInTeam = new Array<UserProfileDTO>();
    this.displayUserDataFlag = false;
    this.displayUserTasksFlag = false;
    this.userData = new UserProfileDTO();
    this.tasks = new Array<TaskDTO>();
  }

  ngOnInit(): void {
    const queryParamsId: string = this.route.snapshot.queryParamMap.get('id');
    this.service.getProjectById(parseInt(queryParamsId)).subscribe(response => {
      this.projectName = response.name;
      this.service.getUsersInProject(parseInt(queryParamsId)).subscribe(response => this.usersInTeam = response)
    });
  }

  public getUserProfile(id: number){
    this.router.navigate(['/profile'], { queryParams: { id: id } });
  }
  public displayTasksByUser(id:number,ind:number){
    this.service.getTasksByUser(id).subscribe(response => {
        this.tasks = response;
        this.selecterUserRow(ind);
        this.displayUserTasksFlag = true;
        this.displayUserDataFlag = false;
      }
      );
  }
  public displayUserData(user: UserProfileDTO, ind:number){
    this.userDataIndexInTable = ind;
    this.userData = user;
    this.displayUserDataFlag = true;
    this.displayUserTasksFlag = false;

    this.selecterUserRow(ind);
  }
  public selecterUserRow(ind: number){
    let rows = document.getElementsByClassName('tableRows');
    for(let i = 0;i < rows.length; i++){
      rows[i].className = "tableRows";
    }
    rows[ind].classList.add("selectedRow");
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
        this.service.getTasksByUser(this.userData.id).subscribe(response => {
          this.tasks = response;
          this.displayUserTasksFlag = true;
          this.selecterUserRow(this.userDataIndexInTable);
        });
      });
    }
  }

  public saveChanges(){
    if(this.choosenTitle != undefined && this.choosenTitle != ""){
      let dto = new ChangingUserDataDTO();
      dto.id = this.userData.id;
      dto.title = this.choosenTitle;
      this.service.updateUserData(dto).subscribe(response => {
        alert("Succesfully changed data..")
        window.location.reload();
      })
    }
    else {
      alert("Fill mandatory fields..");
    }
  }

  public changeUserData(id: number){
    this.router.navigate(['/changeUserData'], { queryParams: { id: id } });
  }
}
