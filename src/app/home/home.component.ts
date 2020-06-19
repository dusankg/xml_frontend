import { Component, OnInit } from '@angular/core';
import {LoginService} from '../login/login.service';
import {BasketService} from '../basket/basket.service';
import {HomeService} from '../home/home.service';
import {Router} from '@angular/router';
import {VehicleDTO} from '../model/VehicleDTO';
import {SearchDTO} from '../model/SearchDTO';
import {CartItem} from '../model/CartItem';
import {Occupation} from '../model/Occupation';
import {ShowVehicleDTO} from '../model/ShowVehicleDTO';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cars: Set<ShowVehicleDTO>;
  selectedSearchDTO: SearchDTO;
  selectedPlace: string;
  selectedStartDate: Date;
  selectedEndDate: Date;
  userName: string;
  cartItem: CartItem;

  constructor(private loginService: LoginService, private basketService: BasketService, private  homeService: HomeService, private router: Router) { }

  ngOnInit(): void {
    this.selectedSearchDTO = new SearchDTO();
    this.cartItem = new CartItem();
    this.cars = new Set<VehicleDTO>();
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

  addToBasket(vehicleId: number, vehicle_name: string, price: number, company_username: string){
    // pravljenje cart itema
    this.cartItem.owner_username = company_username;
    this.cartItem.price = price;
    this.cartItem.vehicle_id = vehicleId;
    this.cartItem.vehicle_name = vehicle_name;
    this.cartItem.time_span = new Occupation();
    this.cartItem.time_span.startDate = this.selectedStartDate;
    this.cartItem.time_span.endDate = this.selectedEndDate;
    this.homeService.addToBasket(this.cartItem, this.userName).subscribe();
  }

  moreInfo(adId: number){
    // this.homeService.moreInfo(adId)
    this.router.navigate(['ad-more-info/' + adId]);
  }

}
