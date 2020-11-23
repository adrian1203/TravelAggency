import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Tour} from "../model/app-models";
import {ShoppingCartService} from "../shopping-cart.service";

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css']
})
export class TourComponent implements OnInit {

  @Output() deleted = new EventEmitter<Tour>();
  @Output() reserve = new EventEmitter<void>();
  @Input() tour: Tour;

  opinion: number;

  constructor(private shoppingCartService: ShoppingCartService) {
  }

  ngOnInit() {
  }


  reservePlace(tour: Tour) {
    this.shoppingCartService.addTour(tour, 1);
    tour.reservePlaces = tour.reservePlaces + 1;
    this.reserve.emit();
  }

  resignationPlace(tour: Tour) {
    tour.reservePlaces = tour.reservePlaces - 1;
  }

  deleteTour() {
    this.deleted.emit(this.tour);
    this.reserve.emit();
  }

}
