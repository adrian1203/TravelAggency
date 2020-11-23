import {Injectable, OnInit} from '@angular/core';
import {Cart, CartElement, Tour, User} from "./model/app-models";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private cartSubject: BehaviorSubject<Cart>;
  public cart: Observable<Cart>;

  constructor() {
    this.cartSubject = new BehaviorSubject<Cart>(JSON.parse(localStorage.getItem('cart')));
    this.cart = this.cartSubject.asObservable();
    const cart = new Cart();
    cart.elements =  new Array<CartElement>()
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartSubject.next(cart);
  }


  addTour(tour: Tour, amout: number) {
    console.log(this.cart);
    const cartElem = new CartElement();
    cartElem.tour = tour;
    cartElem.amount = amout;
    this.cart.subscribe(e => e.elements.push(cartElem));
  }

  public getCart(): Cart {
    return this.cartSubject.value;
  }

}
