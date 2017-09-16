import { Component, OnInit } from '@angular/core';

import { FlashMessagesService } from 'angular2-flash-messages';
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
              private flashMessagesService:FlashMessagesService) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    console.log(this.name);
    const userData = {
      name: this.name,
      username: this.username,
      email: this.username,
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
    
  }
}
