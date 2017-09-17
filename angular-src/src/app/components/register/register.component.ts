import { Component, OnInit } from '@angular/core';

import { AuthService } from './../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { ValidateService } from './../../services/validate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name:String;
  username:String;
  email:String;
  password:String;

  constructor(private validateService: ValidateService,
              private flashMessagesService:FlashMessagesService,
              private auth:AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    console.log(this.name);
    const userData = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }

    if(!this.validateService.validateRegister(userData)) {
      console.log('please fill all fields');
      this.flashMessagesService.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    
    if(!this.validateService.validateEmail(userData.email)) {
      this.flashMessagesService.show('Please use a valid email', { cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    console.log('register.ts > onRegisterSubmit > before oCallBack');
    
    this.auth.registerUser(userData)
      .subscribe((data) => {
        console.log('register.ts > onRegisterSubmit > oCallBack');
        if(data.success) {
          this.flashMessagesService.show('You are now register and can log in ', { cssClass: 'alert-success', timeout: 3000});
          this.router.navigate(['/login']);
        } else {
          this.flashMessagesService.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000});
          this.router.navigate(['/register']);
        }
      });
    console.log('register.ts > onRegisterSubmit > after oCallBack');
  }
}
