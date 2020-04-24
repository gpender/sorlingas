import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap }        from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public get loggedIn(): boolean{
    return localStorage.getItem('access_token') != null;
  }

  constructor(private httpClient: HttpClient) {
  }

  public login(email:string, password:string){
    return this.httpClient.post<{access_token: string}>('http://sorlingas.com:2000/login', {email,password}).pipe(tap(res=>{
      localStorage.setItem('access_token',res.access_token);
      console.log(res.access_token);
    }));
  }

  public register(email:string, password:string){
    return this.httpClient.post<{access_token: string}>('http://sorlingas.com:2000/register', {email,password}).pipe(tap(res=>{
      this.login(email,password);
    }));
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
