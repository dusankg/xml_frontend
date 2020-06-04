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
  goHome(){
    this.router.navigate(['home']);
  }
  goBasket(){
    this.router.navigate(['basket']);
  }
  goAddCar(){
    this.router.navigate(['add-car']);
  }
  goLogin(){
    this.router.navigate(['login']);
  }
  goMyPage(){
    this.router.navigate(['my-profile']);
  }
  goAdminPage(){
    this.router.navigate(['admin']);
  }

}
