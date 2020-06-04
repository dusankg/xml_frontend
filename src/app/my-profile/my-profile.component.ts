import { Component, OnInit } from '@angular/core';
import {CarDTO} from '../model/CarDTO';
import {MyProfileService} from '../my-profile/my-profile.service';
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  cars: Set<CarDTO>;
  selectedStartingDate: Date;
  selectedEndingDate: Date;

  constructor(private myProfileService: MyProfileService) { }

  ngOnInit(): void {
  }

  private getAllCars(){

  }

  public addOccupation(carId: number){
    this.myProfileService.addOccupation(carId, this.selectedStartingDate, this.selectedEndingDate);
  }

  public deleteCar(carId: number){

  }
}
