import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { VehicleDTO } from '../model/VehicleDTO';


@Injectable()
export class AddCarService {
  carCreateUrl: string;

  constructor(private http: HttpClient) {
    this.carCreateUrl = 'http://localhost:8079/vehicle-service/vehicle/';
  }


  public createCar(vehicleDTO: VehicleDTO): Observable<any>{
    console.log(vehicleDTO.images.length);
    return this.http.post<VehicleDTO>(this.carCreateUrl, vehicleDTO);
  }


}
