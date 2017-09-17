import 'rxjs/add/operator/map';

import {Headers, Http} from '@angular/http';

import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  authToken: any;
  user:any;

  constructor(private http:Http) { }

  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, { headers: headers})
      .map(res => res.json());
  }
}
