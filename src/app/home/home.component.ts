import { Component, OnInit } from '@angular/core';
import {LoginService} from '../login/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  secretString: string;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  // poziva metodu u login servisu jer me mrzelo da pravim novi servis!!
  getString() {
    this.loginService.getSecretString()
      .subscribe(
        response => {
          this.secretString = response;
        },
        err => {
          alert('You must log in');
        });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }


}
