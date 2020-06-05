import { Component, OnInit } from '@angular/core';
import {VehicleDTO} from '../model/VehicleDTO';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {AdMoreInfoService} from './ad-more-info.service';

@Component({
  selector: 'app-ad-more-info',
  templateUrl: './ad-more-info.component.html',
  styleUrls: ['./ad-more-info.component.css']
})
export class AdMoreInfoComponent implements OnInit {

  carDTO: VehicleDTO;
  brand: string;
  model: string;
  fuel_type : string;
  transmission: string;
  vehicle_class : string;
  price : number;
  mileage : number;
  companyUsername : string;
  startDate : Date;
  endDate : Date;
  limited_rent_mileage : boolean;
  allowed_mileage : number;
  collision_damage_waiver: boolean;
  child_seat: number;

  private routeSub: Subscription;
  carId: number;
  public base64Images: Array<string>;

  constructor(private route: ActivatedRoute, private  adMoreInfoService: AdMoreInfoService) {
    this.carDTO = new VehicleDTO();
    this.base64Images = new Array<string>();
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.carId = params['id'];
    });

    this.getCarFromId();
    //this.loadImages();
  }

  getCarFromId(){
    this.adMoreInfoService.getById(this.carId).subscribe( response => {
      this.carDTO = response;
      this.brand = this.carDTO.brand;
      this.model = this.carDTO.model;
      this.transmission = this.carDTO.transmission;
      this.vehicle_class = this.carDTO.vehicleClass;
      this.price = this.carDTO.price;
      this.mileage = this.carDTO.mileage;
      this.companyUsername = this.carDTO.companyUsername;
      this.startDate = this.carDTO.startDate;
      this.endDate = this.carDTO.endDate;
      this.limited_rent_mileage = this.carDTO.limitedRentMileage;
      this.allowed_mileage = this.carDTO.allowedMileage;
      this.collision_damage_waiver = this.carDTO.collisionDamageWaiver;
      this.child_seat = this.carDTO.childSeat;
      this.base64Images = this.carDTO.images;
      console.log(this.carDTO);
    });

  }


}
