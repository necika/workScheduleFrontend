import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WorkScheduleFrontend';
  showSideMenuValue : boolean;

  constructor(private router: Router){
    this.showSideMenuValue = false;
  }
  
  public openSideMenuBar() {
    this.showSideMenuValue = true;
  }
  public closeSideMenuBar() {
    this.showSideMenuValue = false;
  }
  public logoutUser(){
      localStorage.clear();
      this.router.navigate(['']);
  }
  public goToProfile(){
    this.router.navigate(['/profile']);
  }

  get someoneLoggedIn(){
    if (localStorage.getItem('jwt') === null || localStorage.getItem('user') === null){
      return false;
    }
    else {
      return true;
    }
  }
  get superAdminLoggedIn(){
    let user = localStorage.getItem('user')
    if (user === null){
      return false;
    }
    else {
      let userJson = JSON.parse(user);
      if(userJson.userType === "SUPERADMIN"){
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
  get simpleUserLoggedIn(){
    let user = localStorage.getItem('user')
    if (user === null){
      return false;
    }
    else {
      let userJson = JSON.parse(user);
      if(userJson.userType === "EMPLOYER"){
        return true;
      }
      return false;
    }
  }
}
export function isSomeoneLoggedInRedirectToLogin(){
  if (localStorage.getItem('jwt') === null || localStorage.getItem('user') === null){
    return false;
  }
  return true;
}
