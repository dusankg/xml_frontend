import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { VehicleDTO } from '../model/VehicleDTO';
import { CustomerDTO } from '../model/CustomerDTO';
import {ReservationDTO} from '../model/ReservationDTO';
import {MessageDTO} from '../model/MessageDTO';
import {SendMessageDTO} from '../model/SendMessageDTO';
import {ReportDTO} from '../model/ReportDTO';
import {ChangePasswordDTO} from '../model/ChangePasswordDTO';
import { AgentVehicleReportDTO } from '../model/AgentVehicleReportDTO';
import { Occupation } from '../model/Occupation';


@Injectable()
export class MyProfileService {
  reservationURL: string;
  getAllCarsURL: string;

  requestsOnMyAdsURL: string;
  myRequestsURL: string;

  messagesURL: string;

  reportURL: string;
  agentReportURL: string;
  changePasswordURL: string;
  

  addDiscountToCarURL: string;

  getMostKmCarURL : string;

  getMostPriceCarURL : string;

  reserveVehicleUrl: string;

  constructor(private http: HttpClient) {
    this.getAllCarsURL = 'http://localhost:8079/vehicle-service/vehicle/user';
    this.reservationURL = 'http://localhost:8079/vehicle-service/vehicle/reserve';

    this.requestsOnMyAdsURL = 'http://localhost:8079/request-service/owner/requests';
    this.myRequestsURL = 'http://localhost:8079/request-service/requests';

    this.messagesURL = 'http://localhost:8079/messaging-service/messages';

    this.reportURL = 'http://localhost:8079/report-service/reports';
    this.agentReportURL = 'http://localhost:8079/report-service/agentReports';

    this.changePasswordURL = 'http://localhost:8079/login-service/password';

    this.addDiscountToCarURL = 'http://localhost:8079/vehicle-service/vehicle/addDiscountToCar/';

    this.getMostKmCarURL = 'http://localhost:8079/vehicle-service/vehicle/getMostKmCar';

    this.getMostPriceCarURL = 'http://localhost:8079/vehicle-service/vehicle/getMostPriceCar';

    this.reserveVehicleUrl = 'http://localhost:8079/vehicle-service/vehicle/reserve';

  }

  public addOccupation(reservation: ReservationDTO){
/*
    console.log('Dodavanje occupationa za auto: ' + reservation.id + reservation.start + reservation.end);
*/
    return this.http.post<ReservationDTO>(this.reservationURL, reservation);
  }

  public getMostKmCar(): Observable<any>{
    return this.http.get<any>(this.getMostKmCarURL);
  }

  public getMostPriceCar(): Observable<any>{
    return this.http.get<any>(this.getMostPriceCarURL);
  }

  public getAllCars(): Observable<any>{
    return this.http.get<any>(this.getAllCarsURL);
  }

  public getMyRequestsPending(){
    return this.http.get<any>(this.myRequestsURL + '/pending');
  }
  public addDiscountToCar(id:number,discount:number,howmany:number){
    return this.http.get<any>(this.addDiscountToCarURL + id + "/" +discount+"/"+howmany);
  }
  public getMyRequestsApproved(){
    return this.http.get<any>(this.myRequestsURL + '/approved');
  }
  public getMyRequestsRejected(){
    return this.http.get<any>(this.myRequestsURL + '/rejected');
  }
  public getMyRequestsFinished(){
    return this.http.get<any>(this.myRequestsURL + '/finished');
  }
  public getRequestsOnMyAdsPending(){
    return this.http.get<any>(this.requestsOnMyAdsURL + '/pending');
  }
  public getRequestsOnMyAdsUncoming(){
    return this.http.get<any>(this.requestsOnMyAdsURL + '/upcoming');
  }
  public getRequestsOnMyAdsFinished(){
    return this.http.get<any>(this.requestsOnMyAdsURL + '/finished');
  }

  public approveRequest(id: number){
    return this.http.put<any>(this.requestsOnMyAdsURL + '/approve/' + id, null);
  }
  public rejectRequest(id: number){
    return this.http.put<any>(this.requestsOnMyAdsURL + '/reject/' + id, null);
  }

  public getSentMessages(){
    return this.http.get<any>(this.messagesURL + '/sent');
  }
  public getReceivedMessages(){
    return this.http.get<any>(this.messagesURL + '/received');
  }
  public sendMessage(message: SendMessageDTO){
    return this.http.post<any>(this.messagesURL, message);
  }
  public sendReport(report: ReportDTO){
    return this.http.post<any>(this.reportURL, report);
  }
  public getReportsForVehicle(vehicle_id_str: number){
    return this.http.get<any>(this.reportURL + '/' + vehicle_id_str);
  }

  public changePassword(changePasswordDTO: ChangePasswordDTO){
    console.log(changePasswordDTO.newPassword);
    return this.http.put<ChangePasswordDTO>(this.changePasswordURL, changePasswordDTO);
  }

  public sendAgentReport(report: AgentVehicleReportDTO){
    console.log(report);
    return this.http.post<any>(this.agentReportURL, report);
  }

  public reserveVehicle(occupation: ReservationDTO){
    return this.http.post<any>(this.reserveVehicleUrl, occupation);
  }
}
