import { Component, OnInit } from '@angular/core';
import {LoginService} from '../login/login.service';
import {BasketService} from '../basket/basket.service';
import {HomeService} from '../home/home.service';
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
  selectedCity: string;
  selectedFuel: string;
  selectedSeats: number;
  selectedPrice: number;
  selectedStartingDate: Date;
  selectedEndingDate: Date;

  constructor(private loginService: LoginService, private basketService: BasketService, private  homeService: HomeService,private router: Router) { }

  ngOnInit(): void {
    this.selectedCar = new CarDTO();
    this.selectedCar.id = 156;
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
    this.homeService.findCarsBySearch(this.selectedCity, this.selectedFuel, this.selectedSeats, this.selectedPrice);
  }

  addToBasket(adId: number){
    this.homeService.addToBasket(adId);
  }

  moreInfo(adId: number){
    //this.homeService.moreInfo(adId)
    this.router.navigate(['ad-more-info/'+ adId]);
  }

}
