import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {jitOnlyGuardedExpression} from '@angular/compiler/src/render3/util';
import {SearchDTO} from '../model/SearchDTO';
import {CartItem} from '../model/CartItem';

@Injectable()
export class HomeService {
  private readonly userUrl: string;
  private readonly searchUrl: string;
  private readonly allCarsURL: string;
  private  readonly addToBasketURL: string;

  constructor(private http: HttpClient) {
    this.searchUrl = 'http://localhost:8079/vehicle-service/search';
    this.allCarsURL = 'http://localhost:8079/vehicle-service/vehicle';
    this.userUrl = 'http://localhost:8080/users/login';
    this.addToBasketURL = 'http://localhost:8079/cart-service/cart';
  }
  public findCarsBySearch(searchDTO: SearchDTO): Observable<any>{
    return this.http.post<any>(this.searchUrl, searchDTO);

  }
  public getAllCars(): Observable<any>{
    return this.http.get<any>(this.allCarsURL);
  }

  public addToBasket(item: CartItem, username: string){
    // treba da dobijem ulogovanog korisnika i njemu dodam oglas
    console.log(this.addToBasketURL + '/' + username);
    console.log(item);
    return this.http.post<any>(this.addToBasketURL, item);
  }

  public moreInfo(adId: number){
    console.log('Prikaz detalja oglasa id: ' + adId);
  }
}
