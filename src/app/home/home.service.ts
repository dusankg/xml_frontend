import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {jitOnlyGuardedExpression} from '@angular/compiler/src/render3/util';
import {SearchDTO} from '../model/SearchDTO';

@Injectable()
export class HomeService {
  private readonly userUrl: string;
  private readonly searchUrl: string;
  private readonly allCarsURL: string;

  constructor(private http: HttpClient) {
    this.userUrl = 'http://localhost:8080/users/login';
    this.searchUrl = 'http://localhost:8083/search';
    this.allCarsURL = 'http://localhost:8083/allCars';
  }

  public getUser(password: string): Observable<any> {
    return this.http.post<any>(this.userUrl, {password});
  }

  public findCarsBySearch(searchDTO: SearchDTO): Observable<any>{
    //console.log('Pretraga za model: ' + searchDTO.place + 'Datum: ' + searchDTO.startDate);
    return this.http.post<any>(this.searchUrl, searchDTO);

  }
  public getAllCars(): Observable<any>{
    return this.http.get<any>(this.allCarsURL);

  }

  public addToBasket(adId: number){
    // treba da dobijem ulogovanog korisnika i njemu dodam oglas
    console.log('Dodavanje u korpu oglasa id: ' + adId);
  }

  public moreInfo(adId: number){
    console.log('Prikaz detalja oglasa id: ' + adId);
  }
}
