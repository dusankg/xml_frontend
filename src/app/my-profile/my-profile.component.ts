import { Component, OnInit } from '@angular/core';
import {VehicleDTO} from '../model/VehicleDTO';
import {MyProfileService} from '../my-profile/my-profile.service';
import {HomeService} from '../home/home.service';
import {ReservationDTO} from '../model/ReservationDTO';
import {RequestDTO} from '../model/RequestDTO';
import {MessageDTO} from '../model/MessageDTO';
import {SendMessageDTO} from '../model/SendMessageDTO';
import {ReportDTO} from '../model/ReportDTO';
import {VehicleReportDTO} from '../model/VehicleReportDTO';
import {ChangePasswordDTO} from '../model/ChangePasswordDTO';
import {Router} from '@angular/router';
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
  showDiscount : boolean;
  selectedCarId : number;
  discount:number;
  howManydays:number;

  showMyAds: boolean;
  showMyRequests: boolean;
  showRequestsOnMyAds: boolean;

  myRequestsPending: Set<RequestDTO>
  requestsOnMyAdsUncoming: Set<RequestDTO>

  requestsOnMyAdsPending: Set<RequestDTO>
  myRequestsApproved: Set<RequestDTO>
  myRequestsRejected: Set<RequestDTO>

  sendMessageTo: string;
  hideMessageBox: boolean;
  messageText: string;
  sentMessages: Set<MessageDTO>;
  receivedMessages: Set<MessageDTO>;

  hideMessages: boolean;
  hideSentMessages: boolean;
  messageButtonText: string;

  hideMyRequestsApproved: boolean;
  hideMyRequestsPending: boolean;
  hideMyRequestsRejected: boolean;

  myAdsRequestButtonString: string;
  hideMyAdsRequests: boolean;

  sendReportTo: number;
  hideReportBox: boolean;
  reportText: string;
  rating: number;

  reports: Set<VehicleReportDTO>
  vehicleNameReport: string;

  hideChangePasswordBox: boolean;

  oldPassword: string;
  newPassword: string;
  repeatNewPassword: string;

  constructor(private myProfileService: MyProfileService, private homeService: HomeService, private  router: Router) {
    this.cars = new Set<VehicleDTO>();
    this.usersCars = new Set<VehicleDTO>();
    this.reservation = new ReservationDTO();

    this.requestsOnMyAdsPending = new Set<RequestDTO>();
    this.requestsOnMyAdsUncoming = new Set<RequestDTO>();

    this.myRequestsPending = new Set<RequestDTO>();
    this.myRequestsApproved = new Set<RequestDTO>();
    this.myRequestsRejected = new Set<RequestDTO>();

    this.sentMessages = new Set<MessageDTO>();
    this.receivedMessages = new Set<MessageDTO>();
    this.messageButtonText = 'Show sent messages';
    this.myAdsRequestButtonString = 'Show upcoming requests';
    this.hideMyAdsRequests = true;

    this.reports = new Set<VehicleReportDTO>();
    this.showDiscount = false;


  }

  ngOnInit(): void {

    this.showMyAds = false;
    this.showMyRequests = true;
    this.showRequestsOnMyAds = true;

    this.hideMessageBox = true;
    this.hideMessages = true;
    this.hideSentMessages = true;

    this.hideMyRequestsApproved = false;
    this.hideMyRequestsPending = true;
    this.hideMyRequestsRejected = true;

    this.hideReportBox = true;
    this.hideChangePasswordBox = true;
    this.updateData();
  }

  updateData(){
    this.getAllCars();
    this.getMyRequestsPending();
    this.getMyRequestsApproved();
    this.getMyRequestsRejected()

    this.getRequestOnMyAdsPending();
    this.getRequestOnMyAdsUncoming();

    this.getSentMessages();
    this.getReceivedMessages();
  }

  getAllCars(){
    this.myProfileService.getAllCars().subscribe(response => this.usersCars = response,err => {
      if(err.status){
        alert("You have not permission..");
      }
    });
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

  public showDiscounts(carId: number){
    this.selectedCarId = carId;
    this.showDiscount = true;
  }

  public addDiscount(){
    if(this.discount == null || this.howManydays == null){
      alert("You must enter a fields..");
    }else {
      this.myProfileService.addDiscountToCar(this.selectedCarId,this.discount,this.howManydays).subscribe(result => {
        alert("You add a discount for this car..");
        this.selectedCarId = null;
        this.showDiscount = false;
        this.howManydays = null;
      });;
    }
  }

  public showMyAdsFuncion(){
    this.showMyAds = false;
    this.showMyRequests = true;
    this.showRequestsOnMyAds = true;
    this.hideMessageBox = true;
    this.messageText = '';
    this.hideMessages = true;
  }
  public showMyRequestsFuncion(){
    this.showMyAds = true;
    this.showMyRequests = false;
    this.showRequestsOnMyAds = true;
    this.hideMessageBox = true;
    this.messageText = '';
    this.hideMessages = true;
  }
  public showRequestsOnMyAdsFuncion(){
    this.showMyAds = true;
    this.showMyRequests = true;
    this.showRequestsOnMyAds = false;
    this.hideMessageBox = true;
    this.messageText = '';
    this.hideMessages = true;
  }
  public showChangePasswordBox(){
    this.hideChangePasswordBox = false;
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
    this.myProfileService.getRequestsOnMyAdsUncoming().subscribe(response => this.requestsOnMyAdsUncoming = response,error => {
      if(error.status === 401){
        alert("You have not request permission");
      }
    });
  }

  public approveRequest(id: number){
    this.myProfileService.approveRequest(id).subscribe();
    this.updateData();
  }
  public rejectRequest(id: number){
    this.myProfileService.rejectRequest(id).subscribe();
    this.updateData();
  }

  public openMesasgeBox(owner: string){
    this.sendMessageTo = owner;
    this.hideMessageBox = false;
  }

  public sendMessage(){
    this.hideMessageBox = true;
    var messageSend: SendMessageDTO;
    messageSend = new SendMessageDTO();
    messageSend.receiver = this.sendMessageTo;
    messageSend.text = this.messageText;
    console.log("Iz component.ts: " + messageSend.text)
    this.myProfileService.sendMessage(messageSend).subscribe();
    this.messageText = '';
    this.updateData();
  }

  public getSentMessages(){
    this.myProfileService.getSentMessages().subscribe(response => this.sentMessages = response);
  }
  public getReceivedMessages(){
    this.myProfileService.getReceivedMessages().subscribe(response => this.receivedMessages = response,error => {
      if(error.status === 401){
        alert("You have not a message permission..");
      }
    });
  }
  public openMessages(){
    this.hideMessages = false;
    this.showMyAds = true;
    this.showMyRequests = true;
    this.showRequestsOnMyAds = true;
    this.hideMessageBox = true;
  }

  public changeMessages(){
    this.hideSentMessages = !this.hideSentMessages;
    if(this.hideSentMessages){
      this.messageButtonText = 'Show sent messages';
    } else {
      this.messageButtonText = 'Show received messages';
    }
  }

  public showMyApproved(){
    this.hideMyRequestsApproved = false;
    this.hideMyRequestsRejected = true;
    this.hideMyRequestsPending = true;
  }
  public showMyPending(){
    this.hideMyRequestsApproved = true;
    this.hideMyRequestsRejected = true;
    this.hideMyRequestsPending = false;
  }
  public showMyRejected(){
    this.hideMyRequestsApproved = true;
    this.hideMyRequestsRejected = false;
    this.hideMyRequestsPending = true;
  }

  public changeMyAdsRequestsView(){
    this.hideMyAdsRequests = !this.hideMyAdsRequests;
    if(!this.hideMyAdsRequests){
      this.myAdsRequestButtonString = 'Show pending requests';
    } else {
      this.myAdsRequestButtonString = 'Show upcoming requests';
    }
  }

  public sendReport(){
    this.hideReportBox = true;
    var reportSend: ReportDTO;
    reportSend = new ReportDTO();
    reportSend.vehicle_id = this.sendReportTo;
    reportSend.comment = this.reportText;
    reportSend.rating = this.rating;
    // todo add subsribe
    this.myProfileService.sendReport(reportSend).subscribe();
    this.reportText = '';
    this.updateData();
  }
  public openReportBox(owner: number){
    this.sendReportTo = owner;
    this.hideReportBox = false;
  }

  public getReportsForVehicle(vehicle_id: number, vehicleName: string){
    this.vehicleNameReport = vehicleName;
    this.myProfileService.getReportsForVehicle(vehicle_id).subscribe(response => this.reports = response);
  }

  public changePasssword(){
    if(this.newPassword === this.repeatNewPassword){
      let changePasswordDTO: ChangePasswordDTO;
      changePasswordDTO = new ChangePasswordDTO();
      changePasswordDTO.newPassword = this.newPassword;
      changePasswordDTO.oldPassword = this.oldPassword;
      this.myProfileService.changePassword(changePasswordDTO).subscribe(response => {
          this.hideChangePasswordBox = true;
          alert('Password has been changed');
          localStorage.clear();
          this.router.navigate(['login']);
      },
          error =>  alert('Incorrect password'));

    } else {
      alert('Passwords does not match');
    }

  }
}
