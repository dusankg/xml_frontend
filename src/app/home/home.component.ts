import { Component, OnInit } from '@angular/core';
import {LoginService} from '../login/login.service';
import {BasketService} from '../basket/basket.service';
import {HomeService} from '../home/home.service';
import {Router} from '@angular/router';
import {VehicleDTO} from '../model/VehicleDTO';
import {SearchDTO} from '../model/SearchDTO';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cars: Set<VehicleDTO>;
  selectedCar: VehicleDTO;
  selectedSearchDTO: SearchDTO;
  selectedPlace: string;
  selectedStartDate: Date;
  selectedEndDate: Date;

  constructor(private loginService: LoginService, private basketService: BasketService, private  homeService: HomeService, private router: Router) { }

  ngOnInit(): void {
    this.selectedCar = new VehicleDTO();
    this.selectedSearchDTO = new SearchDTO();
    this.selectedCar.id = 156;
    this.selectedCar.model = 'Dusan';
    this.cars = new Set<VehicleDTO>();
    this.cars.add(this.selectedCar);
    this.getAllCars();
    console.log(this.cars);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }


  getCarsBySearch(){
    this.selectedSearchDTO.place = this.selectedPlace;
    this.selectedSearchDTO.startDate = this.selectedStartDate;
    this.selectedSearchDTO.endDate = this.selectedEndDate;
    this.homeService.findCarsBySearch(this.selectedSearchDTO).subscribe(response => this.cars = response);
  }

  getAllCars(){
    this.homeService.getAllCars().subscribe(response => this.cars = response);
  }

  addToBasket(adId: number){
    this.homeService.addToBasket(adId);
  }

  moreInfo(adId: number){
    // this.homeService.moreInfo(adId)
    this.router.navigate(['ad-more-info/' + adId]);
  }

}
