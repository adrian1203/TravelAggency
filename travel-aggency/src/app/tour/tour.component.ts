import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CartElement, Tour} from '../model/app-models';
import {ShoppingCartService} from '../_service/shopping-cart.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css']
})
export class TourComponent implements OnInit {

  @Output() deleted = new EventEmitter<Tour>();
  @Output() reserve = new EventEmitter<void>();
  @Input() tour: Tour;
  @Input() isAdminView: boolean;
  @Input() myReservedPlace: number;
  @Input() cartElement: CartElement;


  constructor(private shoppingCartService: ShoppingCartService, private router: Router) {
  }

  ngOnInit() {
  }

  deleteTour() {
    this.deleted.emit(this.tour);
    this.reserve.emit();
  }
  removeReservation() {
    this.shoppingCartService.removeTour(this.cartElement.tour);
  }

}
