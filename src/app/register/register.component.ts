import { Component, OnInit } from '@angular/core';
import {UserDTO} from '../model/UserDTO';
import {RegisterService} from './register.service';
import {Router} from '@angular/router';
import { FormsModule } from '@angular/forms';
import {ValidationDTO} from '../model/ValidationDTO';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  showValidatePage: boolean;
  user: UserDTO;
  email: string;
  password: string;
  confirmPassword: string;

  validationCode: number;
  validationEmail: string;

  validation: ValidationDTO;
  constructor(private registerService: RegisterService, private  router: Router) {
    this.user = new UserDTO();
    this.validation = new ValidationDTO();
  }

  ngOnInit(): void {
    this.showValidatePage = false;
  }

  public sendValidationCode(){
    this.user.username = this.email;
    if(this.password !== this.confirmPassword){
      alert('Passwords dont match');
    }
    this.user.password = this.password;
    this.user.role = 'CLIENT';
    this.showValidatePage = true;
    this.registerService.sendRequest(this.user).subscribe();
    alert('Validation code sent to email: ' + this.email);
  }
  public finishRegistration(){
    this.validation.username = this.validationEmail;
    this.validation.validationCode = this.validationCode;
    this.registerService.validate(this.validation).subscribe();
    alert('Now, you can login');
    this.router.navigate(['login']);
  }

}
