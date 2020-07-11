import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { VehicleGpsDTO } from '../model/VehicleGpsDTO';
@Injectable()

export class GpsMapService {
  updateCoords: string;

  constructor(private http: HttpClient) {
    this.updateCoords = 'http://localhost:8079/gps-service/coordinates';
  }

  updateCoordinates(id: number): Observable<any>{
    return this.http.get<VehicleGpsDTO>(this.updateCoords + '/' + id);
  }


}
