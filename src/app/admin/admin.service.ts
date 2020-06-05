import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {jitOnlyGuardedExpression} from '@angular/compiler/src/render3/util';
import {BrandDTO} from '../model/BrandDTO';
import {FuelType} from '../model/FuelType';
import {TransmissionTypeDTO} from '../model/TransmissionTypeDTO';
import {VehicleClass} from '../model/VehicleClass';
import {ModelDTO} from '../model/ModelDTO';

@Injectable()
export class AdminService {
  private readonly userUrl: string;
  private readonly createBrandUrl: string;
  private readonly createModelUrl: string;
  private readonly createFuelTypeUrl: string;
  private readonly createTransmissionUrl: string;
  private readonly createClassUrl: string;

  private readonly getAllBrandUrl: string;
  private readonly getAllModelUrl: string;
  private readonly getAllFuelTypeUrl: string;
  private readonly getAllTransmissionUrl: string;
  private readonly getAllClassUrl: string;

  private readonly deleteBrandUrl: string;
  private readonly deleteModelUrl: string;
  private readonly deleteFuelTypeUrl: string;
  private readonly deleteTransmissionUrl: string;
  private readonly deleteClassUrl: string;


  constructor(private http: HttpClient) {
    this.userUrl = 'https://localhost:8080/users/login';
    this.createBrandUrl = 'http://localhost:8082/brand/create';
    this.createModelUrl = 'http://localhost:8082/model/create';
    this.createFuelTypeUrl = 'http://localhost:8082/fueltype/create';
    this.createTransmissionUrl = 'http://localhost:8082/transmission/create';
    this.createClassUrl = 'http://localhost:8082/vehicleclass/create';

    this.getAllBrandUrl = 'http://localhost:8082/brand/getall';
    this.getAllModelUrl = 'http://localhost:8082/model/getall';
    this.getAllFuelTypeUrl = 'http://localhost:8082/fueltype/getall';
    this.getAllTransmissionUrl = 'http://localhost:8082/transmission/getall';
    this.getAllClassUrl = 'http://localhost:8082/vehicleclass/getall';

    this.deleteBrandUrl = 'http://localhost:8082/brand/delete';
    this.deleteModelUrl = 'http://localhost:8082/model/delete';
    this.deleteFuelTypeUrl = 'http://localhost:8082/fueltype/delete';
    this.deleteTransmissionUrl = 'http://localhost:8082/transmission/delete';
    this.deleteClassUrl = 'http://localhost:8082/vehicleclass/delete';

  }

  public getUser(password: string): Observable<any> {
    return this.http.post<any>(this.userUrl, {password});
  }

  public getAllUsers(){

  }

  public addNewBrand(brand: BrandDTO): Observable<any>{
    return this.http.post<any>(this.createBrandUrl , brand);
  }
  public addNewFuelType(fuelType: FuelType): Observable<any>{
    return this.http.post<any>(this.createFuelTypeUrl , fuelType);
  }
  public addNewTransmission(transmission: TransmissionTypeDTO): Observable<any>{
    return this.http.post<any>(this.createTransmissionUrl , transmission);
  }
  public addNewClass(vehicleClass: VehicleClass): Observable<any>{
    return this.http.post<any>(this.createClassUrl , vehicleClass);
  }

  public addNewModel(model: ModelDTO): Observable<any>{
    return this.http.post<any>(this.createModelUrl , model);
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

  public deleteBrand(name: string){
    return this.http.post(this.deleteBrandUrl + '/' + name, null);
  }
  public deleteFuelType(name: string){
    return this.http.post(this.deleteFuelTypeUrl+ '/' + name, null);
  }
  public deleteTransmission(name: string){
    return this.http.post(this.deleteTransmissionUrl + '/' + name, null);
  }
  public deleteClass(name: string){
    return this.http.post(this.deleteClassUrl + '/' + name, null);
  }
  public deleteModel(name: string){
    return this.http.post(this.deleteModelUrl + '/' + name, null);
  }

  public blockUser(userId: number){

  }

  public activateUser(userId: number){

  }
  public deleteUser(userId: number){

  }
}
