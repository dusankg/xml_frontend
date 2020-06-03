import { Component, NgModule, OnInit} from '@angular/core';
import {LoginService} from './login/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'frontend-agent';

  constructor(private  router: Router) {
  }

  ngOnInit(): void {
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['home']);
  }

}
