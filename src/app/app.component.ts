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
}
