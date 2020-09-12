import { Component, OnInit } from '@angular/core';
import { UserProfileDTO } from '../models/userProfileDTO';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: UserProfileDTO;

  constructor(private service: ProfileService) {
    this.currentUser = new UserProfileDTO();
   }

  ngOnInit(): void {
    this.service.getLoggedUser().subscribe(response => {
      this.currentUser.id = response.id;
      this.currentUser.age = response.age;
      this.currentUser.email = response.email;
      this.currentUser.firstName = response.firstName;
      this.currentUser.lastName = response.lastName;
      this.currentUser.jobTitle = response.jobTitle;
    });
  }

}
