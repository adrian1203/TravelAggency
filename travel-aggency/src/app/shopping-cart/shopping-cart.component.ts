import {Component, OnInit} from '@angular/core';
import {Tour} from "../model/app-models";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  constructor() {
  }

  orders: Map<Tour, number>;

  ngOnInit(): void {
  }

  addTour(tour: Tour) {

  }

}
