import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {jitOnlyGuardedExpression} from '@angular/compiler/src/render3/util';

@Injectable()
export class HomeService {
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

  public addToBasket(adId: number){
    // treba da dobijem ulogovanog korisnika i njemu dodam oglas
    console.log('Dodavanje u korpu oglasa id: ' + adId);
  }

  public moreInfo(adId: number){
    console.log('Prikaz detalja oglasa id: ' + adId);
  }
}
