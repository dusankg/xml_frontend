import { Component, OnInit } from '@angular/core';
import {CartItem} from '../model/CartItem';
import {BasketService} from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  userName: string;
  cartItems: Set<CartItem>;
  constructor(private basketService: BasketService) {
    this.cartItems = new Set<CartItem>();
  }

  ngOnInit(): void {
  }

  getCartItems(){
    this.basketService.getCartItems(this.userName).subscribe(response => this.cartItems = response);
    console.log(this.cartItems);
  }
}
