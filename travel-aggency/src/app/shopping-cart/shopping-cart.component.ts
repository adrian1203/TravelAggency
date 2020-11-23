import {Component, OnInit} from '@angular/core';
import {CartElement, Tour} from "../model/app-models";
import {ShoppingCartService} from "../shopping-cart.service";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  constructor(private shoppingCartService: ShoppingCartService) {
  }

  cartElements: CartElement[];

  ngOnInit(): void {
    this.cartElements = this.shoppingCartService.getCart().elements;
  }


}
