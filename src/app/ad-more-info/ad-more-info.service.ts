import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {jitOnlyGuardedExpression} from '@angular/compiler/src/render3/util';

@Injectable()
export class AdMoreInfoService {
  private readonly userUrl: string;

  constructor(private http: HttpClient) {
    this.userUrl = 'https://localhost:8080/users/login';
  }

  public getUser(password: string): Observable<any> {
    return this.http.post<any>(this.userUrl, {password});
  }

  public findCarsBySearch(city: string, fuel: string, seats: number, price: number){
    console.log('Pretraga za model: ' + city + fuel + seats + price);
  }

  public getCarFromId(id: number){
    console.log('Trazi se auto sa idijem: ' + id);
  }
}
