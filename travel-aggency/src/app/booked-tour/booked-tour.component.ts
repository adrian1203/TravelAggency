import { Component, OnInit } from '@angular/core';
import {Cart} from "../model/app-models";
import {ShoppingCartService} from "../shopping-cart.service";

@Component({
  selector: 'app-booked-tour',
  templateUrl: './booked-tour.component.html',
  styleUrls: ['./booked-tour.component.css']
})
export class BookedTourComponent implements OnInit {

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
