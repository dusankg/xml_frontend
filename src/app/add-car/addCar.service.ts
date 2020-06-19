import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { VehicleDTO } from '../model/VehicleDTO';


@Injectable()
export class AddCarService {
  carCreateUrl: string;

  private readonly getAllBrandUrl: string;
  private readonly getAllFuelTypeUrl: string;
  private readonly getAllTransmissionUrl: string;
  private readonly getAllClassUrl: string;

  constructor(private http: HttpClient) {
    this.carCreateUrl = 'http://localhost:8079/vehicle-service/vehicle/';
    this.getAllBrandUrl = 'http://localhost:8079/vehicle-service/brands';
    this.getAllFuelTypeUrl = 'http://localhost:8079/vehicle-service/fuel_type';
    this.getAllTransmissionUrl = 'http://localhost:8079/vehicle-service/transmissions';
    this.getAllClassUrl = 'http://localhost:8079/vehicle-service/vehicle_classes';
  }


  public createCar(vehicleDTO: VehicleDTO): Observable<any>{
    console.log(vehicleDTO.images.length);
    return this.http.post<VehicleDTO>(this.carCreateUrl, vehicleDTO);
  }

  public getAllBrands(): Observable<any>{
    return this.http.get<any>(this.getAllBrandUrl);

  }
  public getAllFuelTypes(): Observable<any>{
    return this.http.get<any>(this.getAllFuelTypeUrl);

  }
  public getAllTransmissions(): Observable<any>{
    return this.http.get<any>(this.getAllTransmissionUrl);

  }
  public getAllVehicleClasses(): Observable<any>{
    return this.http.get<any>(this.getAllClassUrl);

  }
}
