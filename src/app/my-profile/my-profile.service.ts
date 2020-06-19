import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { VehicleDTO } from '../model/VehicleDTO';
import { CustomerDTO } from '../model/CustomerDTO';
import {ReservationDTO} from '../model/ReservationDTO';


@Injectable()
export class MyProfileService {
  reservationURL: string;
  constructor(private http: HttpClient) {
    this.reservationURL = 'http://localhost:8079/vehicle-service/reserveVehicle';
  }

  public deleteCar(carId: number){
    console.log('Brisanje auta sa id-jem: ' + carId);
  }
  public addOccupation(reservation: ReservationDTO){
    console.log('Dodavanje occupationa za auto: ' + reservation.id + reservation.start + reservation.end);
    return this.http.post<any>(this.reservationURL, reservation);
  }
}
