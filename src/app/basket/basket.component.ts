import { Component, OnInit } from '@angular/core';
import {CartItem} from '../model/CartItem';
import {BasketService} from './basket.service';
import {BundleQueryDTO} from '../model/BundleQueryDTO';
import {PurchaseCartDTO} from '../model/PurchaseCartDTO';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  cartItems: Set<CartItem>;
  bundleRequests: Set<BundleQueryDTO>;

  hidden: boolean;
  public emptyCart: boolean;
  constructor(private basketService: BasketService) {
    this.cartItems = new Set<CartItem>();
    this.bundleRequests  = new Set<BundleQueryDTO>();
    this.hidden = true;
  }

  ngOnInit(): void {
    this.getCartItems();
    this.makeBundleQueries();
  }

  makeBundleQueries(){
    for(var item of this.cartItems.values()){
      var postoji: boolean;
      postoji = false;
      for(var bundle of this.bundleRequests.values()){
        if(bundle.ownerUsername === item.owner_username){
          postoji = true;
        }
      }

      if(!postoji){
        var bund: BundleQueryDTO;
        bund = new BundleQueryDTO();
        bund.ownerUsername = item.owner_username;
        bund.bundle = false;
        this.bundleRequests.add(bund);
      }
    }
  }
  getCartItems(){
    this.basketService.getCartItems().subscribe(response => {
      this.cartItems = response;
    }
      );
    console.log(this.cartItems);
  }

  deleteCartItem(itemID: number){
    this.basketService.deleteCartItem(itemID).subscribe( () => {this.getCartItems(); });
  }

  public changeBundle(owner: string){
    for(var item of this.bundleRequests){
      if(item.ownerUsername === owner){
        item.bundle = !item.bundle;
      }
    }
  }
  public showOrder(){
    this.hidden = false;
    this.makeBundleQueries();
  }

  public placeOrder(){
    if(this.cartItems.size == 0){
      alert("Cart is empty");
      return;
    }
    let query = new PurchaseCartDTO();
    //query.bundleQuery = new Map<string, string>();

    let map = new Map<string, string>();

    // tslint:disable-next-line:prefer-const
    for (var bund of this.bundleRequests){
      if (bund.bundle){
        map.set(bund.ownerUsername, 'True');
      } else {
        map.set(bund.ownerUsername, 'False');
      }
    }
    const obj = [...map].reduce((o, [key, value]) => (o[key] = value, o), {});
    const string = [...map].map(([key, value]) => `${key}:${value}`).join(', ');

    query.bundleQuery = obj;
    this.basketService.placeOrder(query).subscribe( next => {
      this.getCartItems();
      this.bundleRequests  = new Set<BundleQueryDTO>();
      this.hidden = true;
    });
    //location.reload();
  }

  
}
