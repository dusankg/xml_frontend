import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {jitOnlyGuardedExpression} from '@angular/compiler/src/render3/util';

@Injectable()
export class AdMoreInfoService {
  private readonly userUrl: string;
  private readonly findByIdUrl: string;
  private readonly reportURL: string;
  constructor(private http: HttpClient) {
    this.findByIdUrl = 'http://localhost:8079/vehicle-service/vehicle';
    this.reportURL = 'http://localhost:8079/report-service/reports';
  }

  public getUser(password: string): Observable<any> {
    return this.http.post<any>(this.userUrl, {password});
  }

  public getById(id: number): Observable<any>{
    console.log(this.findByIdUrl + '/' + id)
    return this.http.get<any>(this.findByIdUrl + '/' + id);
  }

  public getReportsForVehicle(vehicle_id_str: number){
    return this.http.get<any>(this.reportURL + '/' + vehicle_id_str);
  }
}
