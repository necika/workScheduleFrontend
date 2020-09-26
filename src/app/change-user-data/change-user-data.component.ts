import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeUserDataDTO } from '../models/changeUserDataDTO';
import { UserProfileDTO } from '../models/userProfileDTO';
import { ChangeUserDataService } from './change-user-data.service';

@Component({
  selector: 'app-change-user-data',
  templateUrl: './change-user-data.component.html',
  styleUrls: ['./change-user-data.component.css']
})
export class ChangeUserDataComponent implements OnInit {
  user: ChangeUserDataDTO;
  password: string;

  constructor(private service: ChangeUserDataService,private route:ActivatedRoute,private router:Router) {
   }

  ngOnInit(): void {
    const queryParamsId: string = this.route.snapshot.queryParamMap.get('id');
    if(queryParamsId != undefined && queryParamsId != ""){
      this.user = new ChangeUserDataDTO();
      this.service.getUser(parseInt(queryParamsId)).subscribe(response => this.user = response);
    }
  }
  public onSubmit(){
    if(this.user.age == undefined || this.user.email == undefined || this.user.email == "" || this.user.firstName == undefined || 
        this.user.firstName == "" || this.user.lastName == undefined || this.user.lastName == ""){
      alert("Fill mandatory fields.")
    }else {
      this.user.password = this.password;
      this.service.changeUserData(this.user).subscribe(response => {
        alert("Succesfully changed user data..");
        this.router.navigate(['/projects'])
      })
    }
  }

}
