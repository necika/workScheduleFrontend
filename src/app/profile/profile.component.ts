import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isSomeoneLoggedInRedirectToLogin } from '../app.component';
import { UserProfileDTO } from '../models/userProfileDTO';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: UserProfileDTO;

  constructor(private service: ProfileService,private route: ActivatedRoute,private router: Router) {
    if(!isSomeoneLoggedInRedirectToLogin()){
      this.router.navigate(['']);
    }
    this.currentUser = new UserProfileDTO();
   }

  ngOnInit(): void {
    const queryParamsId: string = this.route.snapshot.queryParamMap.get('id');

    if(queryParamsId == null || queryParamsId == undefined){
      this.service.getLoggedUser().subscribe(response => {
        this.currentUser.id = response.id;
        this.currentUser.age = response.age;
        this.currentUser.email = response.email;
        this.currentUser.firstName = response.firstName;
        this.currentUser.lastName = response.lastName;
        this.currentUser.jobTitle = response.jobTitle;
      });
    }else {
        this.service.getUserProfile(parseInt(queryParamsId)).subscribe(response => {
          this.currentUser.id = response.id;
          this.currentUser.age = response.age;
          this.currentUser.email = response.email;
          this.currentUser.firstName = response.firstName;
          this.currentUser.lastName = response.lastName;
          this.currentUser.jobTitle = response.jobTitle;
        })
    }
  }
}
