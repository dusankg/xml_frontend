import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {jitOnlyGuardedExpression} from '@angular/compiler/src/render3/util';

@Injectable()
export class AdMoreInfoService {
  private readonly userUrl: string;
  private readonly findByIdUrl: string;

  constructor(private http: HttpClient) {
    this.findByIdUrl = 'http://localhost:8079/vehicle-service/vehicle';
  }

  public getUser(password: string): Observable<any> {
    return this.http.post<any>(this.userUrl, {password});
  }

  public getById(id: number): Observable<any>{
    console.log(this.findByIdUrl + '/' + id)
    return this.http.get<any>(this.findByIdUrl + '/' + id);
  }

  public getCarFromId(id: number){
    console.log('Trazi se auto sa idijem: ' + id);
  }
}
