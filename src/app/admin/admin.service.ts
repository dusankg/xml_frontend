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

  private readonly getUsersUrl: string;
  private readonly activateUserUrl: string;
  private readonly blockUserUrl: string;

  private readonly reportURL: string;

  constructor(private http: HttpClient) {
    this.createBrandUrl = 'http://localhost:8079/admin-service/brand/';
    this.createModelUrl = 'http://localhost:8079/admin-service/model/';
    this.createFuelTypeUrl = 'http://localhost:8079/admin-service/fueltype/';
    this.createTransmissionUrl = 'http://localhost:8079/admin-service/transmission/create';
    this.createClassUrl = 'http://localhost:8079/admin-service/vehicleclass/create';

    this.getAllBrandUrl = 'http://localhost:8079/admin-service/brand/';
    this.getAllModelUrl = 'http://localhost:8079/admin-service/model/';
    this.getAllFuelTypeUrl = 'http://localhost:8079/admin-service/fueltype/';
    this.getAllTransmissionUrl = 'http://localhost:8079/admin-service/transmission/';
    this.getAllClassUrl = 'http://localhost:8079/admin-service/vehicleclass/';

    this.deleteBrandUrl = 'http://localhost:8079/admin-service/brand';
    this.deleteModelUrl = 'http://localhost:8079/admin-service/model';
    this.deleteFuelTypeUrl = 'http://localhost:8079/admin-service/fueltype';
    this.deleteTransmissionUrl = 'http://localhost:8079/admin-service/transmission';
    this.deleteClassUrl = 'http://localhost:8079/admin-service/vehicleclass';

    this.getUsersUrl = 'http://localhost:8079/admin-service/users';
    this.activateUserUrl = 'http://localhost:8079/admin-service/users/activate';
    this.blockUserUrl = 'http://localhost:8079/admin-service/users/block';

    this.reportURL = 'http://localhost:8079/report-service/reports/admin';

  }

  public getActiveUsers(){
    return this.http.get<any>(this.getUsersUrl + '/True');
  }


  public getNonActiveUsers(){
    return this.http.get<any>(this.getUsersUrl + '/False');
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
    return this.http.post(this.deleteBrandUrl + '/' + name + '/', null);
  }
  public deleteFuelType(name: string){
    return this.http.post(this.deleteFuelTypeUrl + '/' + name + '/', null);
  }
  public deleteTransmission(name: string){
    return this.http.post(this.deleteTransmissionUrl + '/' + name + '/', null);
  }
  public deleteClass(name: string){
    return this.http.post(this.deleteClassUrl + '/' + name + '/', null);
  }
  public deleteModel(name: string){
    return this.http.post(this.deleteModelUrl + '/' + name, null);
  }

  public blockUser(username: string){
    return this.http.get<any>(this.blockUserUrl + '/' + username);
  }

  public activateUser(username: string){
    return this.http.get<any>(this.activateUserUrl + '/' + username);
  }
  public deleteUser(username: string){
  }

  public getReports(){
    return this.http.get<any>(this.reportURL);
  }

  public approveComment(id:  number){
    return this.http.put(this.reportURL + '/approve/' + id, null);
  }
  public rejectComment(id: number){
    return this.http.put(this.reportURL + '/reject/' + id, null);
  }
}
