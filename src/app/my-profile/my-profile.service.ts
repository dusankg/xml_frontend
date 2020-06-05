import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { VehicleDTO } from '../model/VehicleDTO';
import { CustomerDTO } from '../model/CustomerDTO';


@Injectable()
export class MyProfileService {
  carCreateUrl : string;

  constructor(private http: HttpClient) {
    this.carCreateUrl = 'https://localhost:8080/car/create';
  }


  public createCar(carDTO: VehicleDTO): Observable<any>{
    return this.http.post<any>(this.carCreateUrl , carDTO);
  }

  public deleteCar(carId: number){
    console.log('Brisanje auta sa id-jem: ' + carId);
  }
  public addOccupation(carId: number, startingDate: Date, endingDate: Date){
    console.log('Brisanje auta sa id-jem: ' + carId + startingDate + endingDate);
  }
}
