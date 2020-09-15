import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isSomeoneLoggedInRedirectToLogin } from '../app.component';
import { TaskDTO } from '../models/taskDTO';
import { TaskService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Array<TaskDTO>;

  constructor(private service: TaskService,private router: Router) {
    if(!isSomeoneLoggedInRedirectToLogin()){
      this.router.navigate(['']);
    }
    this.tasks = new Array<TaskDTO>();
  }

  ngOnInit(): void {
    this.service.getTasks().subscribe(response => this.tasks = response)
  }

  public changeToActive(task: TaskDTO,ind: number){
    this.service.changeToActive(task).subscribe(response => {
      this.tasks[ind].status = "ACTIVE"
    });
  }
  public changeToClosed(task: TaskDTO,ind: number){
    this.service.changeToClosed(task).subscribe(response => {
      this.tasks[ind].status = "CLOSED"
    });
  }
}
