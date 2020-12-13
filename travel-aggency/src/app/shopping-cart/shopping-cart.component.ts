import {Component, OnInit} from '@angular/core';
import {CartElement, Tour} from "../model/app-models";
import {ShoppingCartService} from "../shopping-cart.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {

  cartElements: CartElement[];

  constructor(private shoppingCartService: ShoppingCartService,
              private router: Router) {
    this.shoppingCartService.cart.subscribe(x => {
      this.cartElements = x.elements;
    });
  }


  removeReservation(cartElement: CartElement) {
    this.shoppingCartService.removeTour(cartElement.tour);
  }

  clearCart() {
    this.shoppingCartService.clearCart();
  }

  confirmReservation() {
    this.shoppingCartService.confirmReservation();
    this.router.navigate(['./booked-tour']);
  }


}
