import { Component, OnInit } from '@angular/core';

import { AuthService } from './../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(private auth:AuthService,
              private router:Router,
              private flashMessages:FlashMessagesService) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    const userData = {
      username: this.username,
      password: this.password
    }
    
    this.auth.authenticateUser(userData)
      .subscribe((data) => {
        console.log('login.ts > onLoginSubmit > observable > data = ' + JSON.stringify(data));
        if(data.success) {
          this.auth.storeUserData(data.token, data.user);
          this.flashMessages
          .show( 'You are now logged in', {cssClass: 'alert-success', timeout: 5000} );

          this.router.navigate(['dashboard']);
        } else {
          this.flashMessages
          .show( data.msg, {cssClass: 'alert-danger', timeout: 5000} );

          this.router.navigate(['login']);
        }
      });
  }
}
