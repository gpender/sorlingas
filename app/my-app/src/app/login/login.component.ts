import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  onSubmit(){
    this.authService.login('guy.pender@me.com','qqqqq')
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          console.log(this.authService.loggedIn);
          //his.router.navigate('['home]);
        },
        error => {
          console.log(error);
          console.log(this.authService.loggedIn);

        });
  }
}
