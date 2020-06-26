import { Component, OnInit } from '@angular/core';
import {LoginService} from './login.service';
import {Router} from '@angular/router';
import {HttpHeaders, HttpResponse} from '@angular/common/http';
import {ValidationDTO} from '../model/ValidationDTO';
import {UserDTO} from '../model/UserDTO';
import {ResetPasswordDTO} from '../model/ResetPasswordDTO';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'frontend-agent';
  email: string;
  password: string;
  confirmPassword: string;

  show = false;

  hideLoginBox: boolean;
  hideNewPasswordBox: boolean;
  hideValidateBox: boolean;

  validationCode: number;
  validationEmail: string;
  request: ResetPasswordDTO;
  validation: ValidationDTO;

  constructor(private loginService: LoginService, private  router: Router) {
    this.validation = new ValidationDTO();
    this.request = new UserDTO();
  }

  ngOnInit(): void {
    this.hideNewPasswordBox = true;
    this.hideValidateBox = true;
  }

  login() {
    this.loginService.getUser(this.email, this.password)
      .subscribe(
        (response: HttpResponse<any>) => {
          // localStorage.setItem('jwt', response.token);
          // localStorage.setItem('role', response.role);
          // const str = JSON.stringify(response.headers.get('Authorization'))
          const splitedAuth = response.headers.get('Authorization').split(' ');
          localStorage.setItem('jwt', response.headers.get('Authorization'));
          localStorage.setItem('role', response.headers.get('Role'));
          alert('Successful login');
          this.router.navigate(['home']);
          this.show = false;
        },
        err => {
          if (err.status === 400) {
            alert('Wrong password');
          } else if (err.status === 406 || err.status === 403 || err.status === 401) {
            alert('Wrong password');
          }
          else {
            alert('something gone wrong');
          }
        });
  }

  showNewPasswordBox(){
    this.hideNewPasswordBox = false;
    this.hideLoginBox = true;
  }

  sendValidationCode(){
    this.request.username = this.email;
    if(this.password !== this.confirmPassword){
      alert('Passwords dont match');
      return;
    }
    this.request.password = this.password;
    this.loginService.sendRequest(this.request).subscribe();
    this.hideNewPasswordBox = true;
    this.hideValidateBox = false;
  }

  finishValidation(){
    this.validation.username = this.validationEmail;
    this.validation.validationCode = this.validationCode;
    this.loginService.validate(this.validation).subscribe(response => {
      alert('Now, you can login');
      this.router.navigate(['login']);
    }, err => alert(err.status + ": Validation code is invalid"));
  }

}
