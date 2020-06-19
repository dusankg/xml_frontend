import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

@Injectable()
export class BasketService {
  private readonly getCartItemsURL: string;

  constructor(private http: HttpClient) {
      this.getCartItemsURL = 'http://localhost:8087/cart';;
  }


  public getCartItems(username: string){
    return this.http.get<any>(this.getCartItemsURL + '/' + username);
  }
}
