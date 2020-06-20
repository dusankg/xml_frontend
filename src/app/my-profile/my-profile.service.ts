import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { VehicleDTO } from '../model/VehicleDTO';
import { CustomerDTO } from '../model/CustomerDTO';
import {ReservationDTO} from '../model/ReservationDTO';


@Injectable()
export class MyProfileService {
  reservationURL: string;
  getAllCarsURL: string;

  requestsOnMyAdsURL: string;
  myRequestsURL: string;
  constructor(private http: HttpClient) {
    this.getAllCarsURL = 'http://localhost:8079/vehicle-service/vehicle/user';
    this.reservationURL = 'http://localhost:8079/vehicle-service/reserveVehicle';

    this.requestsOnMyAdsURL = 'http://localhost:8079/request-service/owner/requests';
    this.myRequestsURL = 'http://localhost:8079/request-service/requests';
  }

  public addOccupation(reservation: ReservationDTO){
/*
    console.log('Dodavanje occupationa za auto: ' + reservation.id + reservation.start + reservation.end);
*/
    return this.http.post<ReservationDTO>(this.reservationURL, reservation);
  }

  public getAllCars(): Observable<any>{
    return this.http.get<any>(this.getAllCarsURL);
  }

  public getMyRequestsPending(){
    return this.http.get<any>(this.myRequestsURL + '/pending');
  }
  public getMyRequestsApproved(){
    return this.http.get<any>(this.myRequestsURL + '/approved');
  }
  public getMyRequestsRejected(){
    return this.http.get<any>(this.myRequestsURL + '/rejected');
  }
  public getRequestsOnMyAdsPending(){
    return this.http.get<any>(this.requestsOnMyAdsURL + '/pending');
  }
  public getRequestsOnMyAdsUncoming(){
    return this.http.get<any>(this.requestsOnMyAdsURL + '/upcoming');
  }
  public approveRequest(id: number){
    return this.http.put<any>(this.requestsOnMyAdsURL + '/approve/' + id, null);
  }
  public rejectRequest(id: number){
    return this.http.put<any>(this.requestsOnMyAdsURL + '/reject/' + id, null);
  }
}
