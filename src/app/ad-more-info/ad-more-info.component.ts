import { Component, OnInit } from '@angular/core';
import {CarDTO} from '../model/CarDTO';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {AdMoreInfoService} from './ad-more-info.service';

@Component({
  selector: 'app-ad-more-info',
  templateUrl: './ad-more-info.component.html',
  styleUrls: ['./ad-more-info.component.css']
})
export class AdMoreInfoComponent implements OnInit {

  carDTO: CarDTO;
  carType: string;
  carModel: string;
  carClass: string;
  lowerPrice: number;
  upperPrice: number;
  transmissionType: string;
  kmPlanAmount: number;
  kmAmount: number;
  cdw: boolean;
  kidsSeats: number;
  private routeSub: Subscription;
  carId: number;
  public base64Images: Set<string>;

  constructor(private route: ActivatedRoute, private  adMoreInfoService: AdMoreInfoService) {
    this.carDTO = new CarDTO();
    this.cdw = true;
    this.carModel = 'Dusan';
    this.base64Images = new Set<string>();
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.carId = params['id'];
    });

    this.getCarFromId();

    this.carType = this.carDTO.carType;
    this.carModel = this.carDTO.carModel;
    this.carClass = this.carDTO.carClass;
    this.lowerPrice = this.carDTO.lowerPrice;
    this.upperPrice = this.carDTO.upperPrice;
    this.transmissionType = this.carDTO.transmissionType;
    this.kmPlanAmount = this.carDTO.kmPlanAmount;
    this.kmAmount = this.carDTO.kmAmount;
    this.cdw = this.carDTO.cdw;
    this.kidsSeats = this.carDTO.kidsSeats;
  }

  getCarFromId(){
    this.adMoreInfoService.getCarFromId(this.carId);
  }
}
