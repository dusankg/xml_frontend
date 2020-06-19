import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { VehicleDTO } from '../model/VehicleDTO';
import { CustomerDTO } from '../model/CustomerDTO';
import {ReservationDTO} from '../model/ReservationDTO';


@Injectable()
export class MyProfileService {
  carCreateUrl: string;
  reservationURL: string;
  constructor(private http: HttpClient) {
    this.carCreateUrl = 'https://localhost:8080/car/create';
    this.reservationURL = 'http://localhost:8083/reserveVehicle';
  }


  public createCar(carDTO: VehicleDTO): Observable<any>{
    return this.http.post<any>(this.carCreateUrl , carDTO);
  }

  public deleteCar(carId: number){
    console.log('Brisanje auta sa id-jem: ' + carId);
  }
  public addOccupation(reservation: ReservationDTO){
    console.log('Dodavanje occupationa za auto: ' + reservation.id + reservation.start + reservation.end);
    return this.http.post<any>(this.reservationURL, reservation);
  }
}
