import {Injectable, OnInit} from '@angular/core';
import {Cart, CartElement, Tour, User} from './model/app-models';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private cartSubject: BehaviorSubject<Cart>;
  public cart: Observable<Cart>;

  constructor() {
    this.cartSubject = new BehaviorSubject<Cart>(JSON.parse(localStorage.getItem('cart')));
    this.cart = this.cartSubject.asObservable();
    if (this.cartSubject.value == null) {
      const cart = new Cart();
      cart.elements = new Array<CartElement>()
      localStorage.setItem('cart', JSON.stringify(cart));
      this.cartSubject.next(cart);
    }
  }


  public addTour(tour: Tour, amout: number) {
    const cartElem = new CartElement();
    cartElem.tour = tour;
    cartElem.amount = amout;
    const cart = this.cartSubject.value;
    cart.elements.push(cartElem);
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartSubject.next(cart);

  }

  public getCart(): Cart {
    return this.cartSubject.value;
  }

  public removeTour(tour: Tour) {
    const cart = this.cartSubject.value;
    cart.elements = cart.elements.filter(e => e.tour !== tour);
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartSubject.next(cart);

  }

  public clearCart() {
    localStorage.removeItem('cart');
    const cart = new Cart();
    cart.elements = new Array<CartElement>();
    this.cartSubject.next(cart);
  }

}
