import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
baseUrl = 'https://localhost:5001/api/';
loginDTO: any;
registerDTO: any;
private currentUserSource = new BehaviorSubject<User | null>(null);
currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) {}

login(username: string, password: string) {

  this.loginDTO = {
    'username' : username,
    'password' : password
  }

  return this.http.post<User>(this.baseUrl + 'account/login', this.loginDTO).pipe(
    map((response: User) => {
      const user = response;
      if(user)
      {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSource.next(user);
      }
    })
  );
}

register(username: string, password: string) {
  this.registerDTO = {
    'username' : username,
    'password' : password
  }
  return this.http.post<User>(this.baseUrl + 'account/register', this.registerDTO).pipe(
    map(user => {
      if(user)
      {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSource.next(user);        
      }
      return user; //incase we want to use the return type in our components. Else no need to return
    })
  )
}

setCurrentUser(user: User) {
  this.currentUserSource.next(user);
}

logout(){
  localStorage.removeItem('user');
  this.currentUserSource.next(null);
}
  
}
