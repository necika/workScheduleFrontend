import { Component, OnInit } from '@angular/core';
import { AddProjectDTO } from '../models/addProjectDTO';
import { UserProfileDTO } from '../models/userProfileDTO';
import { AddProjectService } from './add-project.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  allUsers: Array<UserProfileDTO>;
  allTeamLeaders: Array<UserProfileDTO>;

  name:string;
  description:string;
  teamleader:number;
  users: Array<number>;

  constructor(private service: AddProjectService) { 
    this.teamleader = -1;
    this.allUsers = new Array<UserProfileDTO>();
    this.allTeamLeaders = new Array<UserProfileDTO>();
    this.users = new Array<number>();
  }

  ngOnInit(): void {
    this.service.getAllUsers().subscribe(response => this.allUsers = response);
    this.service.getTeamLeaders().subscribe(response => this.allTeamLeaders = response);
  }
  addProject() {
    if(this.users.length == 0 || this.teamleader == -1 || this.name == "" 
      || this.name == undefined || this.description == undefined || this.description == ""){
        alert("Fill mandatory fields..")
    }else {
        let addProjectDTO = new AddProjectDTO();
        addProjectDTO.description = this.description;
        addProjectDTO.name = this.name;
        addProjectDTO.users = this.users;
        addProjectDTO.teamLeader = this.teamleader;
        this.service.addProject(addProjectDTO).subscribe();
    }
  }

}
