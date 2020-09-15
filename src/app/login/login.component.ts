import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { isSomeoneLoggedInRedirectToLogin } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logemail : string;
  logpassword : string

  constructor(private service: LoginService,private router: Router, private route: ActivatedRoute) { 
    if(isSomeoneLoggedInRedirectToLogin()){
      this.router.navigate(['/profile']);
    }
  }

  ngOnInit(): void {

  }

  onSubmit(){
    //this.router.navigate(['/timesheet']);
    this.service.getUser(this.logemail, this.logpassword)
      .subscribe(
        response => {
          localStorage.setItem('jwt', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          const user = JSON.parse(localStorage.getItem('user'));
          alert("Succesfully login: "+user.firstName + " " + user.lastName);
          this.router.navigate(['/profile']);
        },
        err => {
          if (err.status === 400) {
            alert('User with given email does not exist');
          } else if (err.status === 406 || err.status === 403) {
            alert('Account not activated');
          }
          else {
            alert("ERROR");
          }
        });
  }

}
