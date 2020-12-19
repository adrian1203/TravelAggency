import {Component, OnInit} from '@angular/core';
import {Cart} from "../model/app-models";
import {ToursService} from "../_service/tours.service";
import {ShoppingCartService} from "../_service/shopping-cart.service";
import {AuthenticationService} from "../_service/autentication.service";

@Component({
  selector: 'app-shopping-cart-view',
  templateUrl: './shopping-cart-view.component.html',
  styleUrls: ['./shopping-cart-view.component.css']
})
export class ShoppingCartViewComponent implements OnInit {

  cart: Cart;
  totalPrice: number;
  totalReservation: number;

  constructor(private shoppingCartService: ShoppingCartService
              ) {
    this.shoppingCartService.cart.subscribe(x => {
      this.cart = x;
      this.totalPrice = 0;
      this.totalReservation = 0;
      x.elements.forEach(e => {
        this.totalPrice += e.tour.price * e.amount;
        this.totalReservation += e.amount;
      });
    });

  }

  ngOnInit(): void {
  }

}
