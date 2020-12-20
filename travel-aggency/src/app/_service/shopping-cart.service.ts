import {Injectable, OnInit} from '@angular/core';
import {Cart, CartElement, Tour, AppUser, Reservation} from '../model/app-models';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserService} from "./user.service";
import {AuthenticationService} from "./autentication.service";
import {ToursService} from "./tours.service";
import {AlertService} from "./alert.service";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private cartSubject: BehaviorSubject<Cart>;
  public cart: Observable<Cart>;

  constructor(private authenticationService: AuthenticationService,
              private tourService: ToursService, private alertService: AlertService) {
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
    cart.elements = cart.elements.filter(e => e.tour._id !== tour._id);
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartSubject.next(cart);

  }

  public clearCart() {
    localStorage.removeItem('cart');
    const cart = new Cart();
    cart.elements = new Array<CartElement>();
    this.cartSubject.next(cart);
  }

  confirmReservation() {
    const user = this.authenticationService.currentUserValue;
    this.cart.subscribe(cart => {
      cart.elements.forEach(e => {
        const reservation = new Reservation();
        reservation.tourId = e.tour._id;
        reservation.places = e.amount;
        user.reservation.push(reservation);
        this.tourService.updateTour(e.tour).subscribe(e => {
        });
        this.authenticationService.updateUser(user);
      });

    });
    this.clearCart();
  }

}
