import {Component, OnInit} from '@angular/core';
import {Tour} from '../model/tour-model';
import {ToursService} from "../tours.service";


@Component({
  selector: 'app-tour-list',
  templateUrl: './tour-list.component.html',
  styleUrls: ['./tour-list.component.css']
})
export class TourListComponent implements OnInit {
  tours: Array<Tour> = new Array<Tour>();
  allReservedPlaces = 0;
  maxPrice: number;
  minPrice = 0;


  constructor(private toursService: ToursService) {
  }

  ngOnInit() {
    this.getProducts();
    this.calculatePrice();
  }

  countReservedPlaces() {
    let resevedPlaces = 0;
    this.tours.forEach(
      e => resevedPlaces += e.reservePlaces)
    this.allReservedPlaces = resevedPlaces;
  }

  deleteTour(tour: Tour) {
    console.log(tour);
    this.tours = this.tours.filter(e => e !== tour);

  }

  getProducts() {
    this.tours = this.toursService.getProducts();
  }


  calculatePrice() {
    this.maxPrice = this.tours.reduce((p, c) => p.price > c.price ? p : c).price;
    this.minPrice = this.tours.reduce((p, c) => p.price < c.price ? p : c).price;
  }


}




