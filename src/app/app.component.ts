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
  goPermission(){
    this.router.navigate(['permission']);
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
  goRegisterPage(){
    this.router.navigate(['register']);
  }

  get someoneLoggedIn(){
    if (localStorage.getItem('jwt') === null){
      return false;
    }
    else {
      return true;
    }
  }

  get adminLoggedIn(){
    if (localStorage.getItem('role') === 'ROLE_ADMIN'){
      return true;
    }
    else {
      return false;
    }
  }

  get clientLoggedIn(){
    if (localStorage.getItem('role') === 'ROLE_CLIENT'){
      return true;
    }
    else {
      return false;
    }
  }

}
