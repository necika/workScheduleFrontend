import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isSomeoneLoggedInRedirectToLogin } from '../app.component';
import { ProjectDTO } from '../models/projectDTO';
import { ProjectService } from './project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  projects: Array<ProjectDTO>;
  
  constructor(private projectService: ProjectService,private router: Router) {
    if(!isSomeoneLoggedInRedirectToLogin()){
      this.router.navigate(['']);
    }
   }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(response => this.projects = response);
  }
}
