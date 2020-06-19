import { Component, OnInit } from '@angular/core';
import {VehicleDTO} from '../model/VehicleDTO';
import {MyProfileService} from '../my-profile/my-profile.service';
import {HomeService} from '../home/home.service';
import {ReservationDTO} from '../model/ReservationDTO';
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  cars: Set<VehicleDTO>;
  usersCars: Set<VehicleDTO>;
  selectedStartingDate: Date;
  selectedEndingDate: Date;
  userName: string;
  reservation: ReservationDTO;

  constructor(private myProfileService: MyProfileService, private homeService: HomeService) {
    this.cars = new Set<VehicleDTO>();
    this.usersCars = new Set<VehicleDTO>();
    this.reservation = new ReservationDTO();
  }

  ngOnInit(): void {
    this.getAllCars();
  }

  getAllCars(){
    this.homeService.getAllCars().subscribe(response => this.cars = response);
  }

  getUsersCars(){
    this.usersCars = new Set<VehicleDTO>();
    // tslint:disable-next-line:prefer-const
    for (var item of this.cars.values()){
      if(item.companyUsername === this.userName){
        this.usersCars.add(item);
      }
    }
  }

  public addOccupation(carId: number){
    this.reservation.id = carId;
    this.reservation.start = this.selectedStartingDate;
    this.reservation.end = this.selectedEndingDate;
    this.myProfileService.addOccupation(this.reservation).subscribe();
  }

  public deleteCar(carId: number){

  }
}
