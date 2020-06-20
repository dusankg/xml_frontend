import { Component, OnInit } from '@angular/core';
import {VehicleDTO} from '../model/VehicleDTO';
import {MyProfileService} from '../my-profile/my-profile.service';
import {HomeService} from '../home/home.service';
import {ReservationDTO} from '../model/ReservationDTO';
import {RequestDTO} from '../model/RequestDTO';
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

  showMyAds: boolean;
  showMyRequests: boolean;
  showRequestsOnMyAds: boolean;

  myRequestsPending: Set<RequestDTO>
  requestsOnMyAdsUncoming: Set<RequestDTO>

  requestsOnMyAdsPending: Set<RequestDTO>
  myRequestsApproved: Set<RequestDTO>
  myRequestsRejected: Set<RequestDTO>

  constructor(private myProfileService: MyProfileService, private homeService: HomeService) {
    this.cars = new Set<VehicleDTO>();
    this.usersCars = new Set<VehicleDTO>();
    this.reservation = new ReservationDTO();

    this.requestsOnMyAdsPending = new Set<RequestDTO>();
    this.requestsOnMyAdsUncoming = new Set<RequestDTO>();

    this.myRequestsPending = new Set<RequestDTO>();
    this.myRequestsApproved = new Set<RequestDTO>();
    this.myRequestsRejected = new Set<RequestDTO>();
  }

  ngOnInit(): void {
    this.getAllCars();
    this.showMyAds = false;
    this.showMyRequests = true;
    this.showRequestsOnMyAds = true;

    this.getMyRequestsPending();
    this.getMyRequestsApproved();
    this.getMyRequestsRejected()

    this.getRequestOnMyAdsPending();
    this.getRequestOnMyAdsUncoming();

  }

  getAllCars(){
    this.myProfileService.getAllCars().subscribe(response => this.usersCars = response);
  }


  public addOccupation(carId: number){
    this.reservation.id = carId;
    this.reservation.start = this.selectedStartingDate;
    this.reservation.end = this.selectedEndingDate;
    this.myProfileService.addOccupation(this.reservation).subscribe(result => { alert('Reserved'); },
      error => { alert('U cannot reserve car for that period'); });
  }
  public deleteCar(carId: number){

  }

  public showMyAdsFuncion(){
    this.showMyAds = false;
    this.showMyRequests = true;
    this.showRequestsOnMyAds = true;
  }
  public showMyRequestsFuncion(){
    this.showMyAds = true;
    this.showMyRequests = false;
    this.showRequestsOnMyAds = true;
  }
  public showRequestsOnMyAdsFuncion(){
    this.showMyAds = true;
    this.showMyRequests = true;
    this.showRequestsOnMyAds = false;
  }

  getMyRequestsPending(){
    this.myProfileService.getMyRequestsPending().subscribe(response => this.myRequestsPending = response);
  }
  getMyRequestsApproved(){
    this.myProfileService.getMyRequestsApproved().subscribe(response => this.myRequestsApproved = response);
  }
  getMyRequestsRejected(){
    this.myProfileService.getMyRequestsRejected().subscribe(response => this.myRequestsRejected = response);
  }
  getRequestOnMyAdsPending(){
    this.myProfileService.getRequestsOnMyAdsPending().subscribe(response => this.requestsOnMyAdsPending = response);
  }
  getRequestOnMyAdsUncoming(){
    this.myProfileService.getRequestsOnMyAdsUncoming().subscribe(response => this.requestsOnMyAdsUncoming = response);
  }

  public approveRequest(id: number){
    this.myProfileService.approveRequest(id).subscribe();
    location.reload();
  }
  public rejectRequest(id: number){
    this.myProfileService.rejectRequest(id).subscribe();
    location.reload();
  }
}
