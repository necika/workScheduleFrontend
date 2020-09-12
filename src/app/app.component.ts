import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WorkScheduleFrontend';
  showSideMenuValue : boolean;

  constructor(){
    this.showSideMenuValue = false;
  }
  
  public openSideMenuBar() {
    this.showSideMenuValue = true;
  }
  public closeSideMenuBar() {
    this.showSideMenuValue = false;
  }
  get someoneLoggedIn(){
    if (localStorage.getItem('jwt') === null){
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
}
