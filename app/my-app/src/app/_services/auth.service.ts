import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map }        from 'rxjs/operators';
import { tap }        from 'rxjs/operators';

import { User }       from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public get loggedIn(): boolean{
    return localStorage.getItem('currentUser') != null;
  }

  constructor(private httpClient: HttpClient) {
  }

  public login(email:string, password:string){
    localStorage.removeItem('currentUser');
    return this.httpClient.post<User>('http://192.168.147.131:2000/login', {email,password})
      .pipe(map(user => {
        localStorage.setItem('currentUser',JSON.stringify(user));    
        console.log(user.email);
        console.log(user.token);
      }));
  }

  public register(email:string, password:string){
    return this.httpClient.post<any>('http://sorlingas.com:2000/register', {email,password}).pipe(tap(res=>{
      this.login(email,password);
    }));
/*     return this.httpClient.post<{access_token: string}>('http://sorlingas.com:2000/register', {email,password}).pipe(tap(res=>{
      this.login(email,password);
    })); */
  }

  public logout(){
    localStorage.removeItem('access_token');
  }
/*   login(email:string, password:string ) {
      return this.http.post<User>('/api/login', {email, password})
          // this is just the HTTP call, 
          // we still need to handle the reception of the token
          .shareReplay();
  }
 */
}
