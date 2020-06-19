import { Component, OnInit } from '@angular/core';
import {LoginService} from './login.service';
import {Router} from '@angular/router';
import {HttpHeaders, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'frontend-agent';
  username: string;
  password: string;
  show = false;
  constructor(private loginService: LoginService, private  router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.loginService.getUser(this.username, this.password)
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

}
