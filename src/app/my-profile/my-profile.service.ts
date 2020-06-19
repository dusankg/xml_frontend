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
  constructor(private http: HttpClient) {
    this.getAllCarsURL = 'http://localhost:8079/vehicle-service/vehicle/user';
    this.reservationURL = 'http://localhost:8079/vehicle-service/reserveVehicle';
  }

  public deleteCar(carId: number){
    console.log('Brisanje auta sa id-jem: ' + carId);
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
}
