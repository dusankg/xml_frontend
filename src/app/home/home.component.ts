import { Component, OnInit } from '@angular/core';
import {LoginService} from '../login/login.service';
import {BasketService} from '../basket/basket.service';
import {Router} from '@angular/router';
import {CarDTO} from '../model/CarDTO';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cars: Set<CarDTO>;
  selectedCar: CarDTO;

  constructor(private loginService: LoginService, private basketService: BasketService, private router: Router) { }

  ngOnInit(): void {
    this.selectedCar = new CarDTO();
    this.selectedCar.carModel = 'Dusan';
    this.cars = new Set<CarDTO>();
    this.cars.add(this.selectedCar);
    console.log(this.cars)
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  getAllCars(){

  }

  getCarsBySearch(){

  }


}
