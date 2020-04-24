import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
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
    this.authService.login('guy.pender@m.com','dgsgdfgdf')
      .pipe(first())
      .subscribe(
        data => {
          console.log('hello');
          //his.router.navigate('['home]);
        },
        error => {

        });
  }
}
