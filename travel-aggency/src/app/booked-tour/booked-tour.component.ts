import {Component, OnInit} from '@angular/core';
import {AppUser, Cart, Tour} from '../model/app-models';
import {ShoppingCartService} from '../_service/shopping-cart.service';
import {AuthenticationService} from '../_service/autentication.service';
import {ToursService} from '../_service/tours.service';

@Component({
  selector: 'app-booked-tour',
  templateUrl: './booked-tour.component.html',
  styleUrls: ['./booked-tour.component.css']
})
export class BookedTourComponent implements OnInit {

  cart: Cart;
  totalPrice: number;
  totalReservation: number;
  currentUser: AppUser;
  tours: Array<Tour> = new Array<Tour>();


  constructor(private shoppingCartService: ShoppingCartService,
              private authenticationService: AuthenticationService, private tourService: ToursService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);


  }

  ngOnInit(): void {
    this.currentUser.reservation.forEach(e => {
      this.tourService.getTour(e.tourId).subscribe(tour => {
        this.tours.push(tour);
        e.tour = tour;
      });
    });

  }

}
