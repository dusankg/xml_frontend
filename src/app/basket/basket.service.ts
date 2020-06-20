import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {BundleQueryDTO} from '../model/BundleQueryDTO';
import {PurchaseCartDTO} from '../model/PurchaseCartDTO';

@Injectable()
export class BasketService {
  private readonly getCartItemsURL: string;
  private readonly requestCartItemsURL: string;
  private readonly deleteCartItemURL: string;

  constructor(private http: HttpClient) {
      this.getCartItemsURL = 'http://localhost:8079/cart-service/cart';
      this.deleteCartItemURL = 'http://localhost:8079/cart-service/cart';
      this.requestCartItemsURL = 'http://localhost:8079/cart-service/request';
  }


  public getCartItems(){
    return this.http.get<any>(this.getCartItemsURL);
  }

  public deleteCartItem(itemID: number){
    return this.http.delete(this.getCartItemsURL + '/' + itemID);
  }

  public placeOrder(query: PurchaseCartDTO){
    console.log(query);
    return this.http.post<any>(this.requestCartItemsURL, query);
  }
}
