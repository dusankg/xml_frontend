import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

@Injectable()
export class BasketService {
  private readonly getCartItemsURL: string;
  private readonly deleteCartItemURL: string;

  constructor(private http: HttpClient) {
      this.getCartItemsURL = 'http://localhost:8079/cart-service/cart';
      this.deleteCartItemURL = 'http://localhost:8079/cart-service/cart';
  }


  public getCartItems(){
    return this.http.get<any>(this.getCartItemsURL);
  }

  public deleteCartItem(itemID: number){
    return this.http.delete(this.getCartItemsURL + '/' + itemID);
  }
}
