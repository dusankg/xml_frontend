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

  selectedBrand : string;
  selectedModel : string;
  selectedGas : string;
  selectedTrans : string;
  selectedClass : string;
  selectedPrice1 : number;
  selectedPrice2 : number;
  selectedKMAmount : number;
  selectedPlannedKMAmount : number;
  selectedCDW : boolean;
  selectedKidsSeats : number;

  userName: string;
  cartItem: CartItem;
  searchChoose : boolean;

  constructor(private loginService: LoginService, private basketService: BasketService, private  homeService: HomeService, private router: Router) { }

  ngOnInit(): void {
    this.selectedSearchDTO = new SearchDTO();
    this.cartItem = new CartItem();
    this.cars = new Set<VehicleDTO>();
    this.searchChoose = false;
    this.getAllCars();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  getCarsBySearchAdvanced(){
    this.selectedSearchDTO.brand = this.selectedBrand;
    this.selectedSearchDTO.model = this.selectedModel;
    this.selectedSearchDTO.carClass = this.selectedClass;
    if(this.selectedPrice1 == undefined){
      this.selectedSearchDTO.price1 = -1;
    }else {
      this.selectedSearchDTO.price1 = this.selectedPrice1;
    }

    if(this.selectedPrice2 == undefined){
      this.selectedSearchDTO.price2 = -1;
    }else {
      this.selectedSearchDTO.price2 = this.selectedPrice2;
    }

    if(this.selectedKMAmount == undefined){
      this.selectedSearchDTO.KMAmount = -1;
    }else {
      this.selectedSearchDTO.KMAmount = this.selectedKMAmount;
    }

    if(this.selectedPlannedKMAmount == undefined){
      this.selectedSearchDTO.plannedKMAmount = -1;
    }else {
      this.selectedSearchDTO.plannedKMAmount = this.selectedPlannedKMAmount;
    }

    if(this.selectedKidsSeats == undefined){
      this.selectedSearchDTO.kidsSeats = -1;
    }else {
      this.selectedSearchDTO.kidsSeats = this.selectedKidsSeats;
    }
    this.selectedSearchDTO.CDW = this.selectedCDW;
    this.selectedSearchDTO.gas = null;
    this.selectedSearchDTO.transmission = this.selectedTrans;
    console.log(this.selectedSearchDTO);

    this.homeService.findCarsBySearchAdvanced(this.selectedSearchDTO).subscribe(response => this.cars = response);
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
  onCheckboxChange(e) {
    if(e.target.checked){
      this.searchChoose = true;
    }else{
      this.searchChoose = false;
    }
  }

}
