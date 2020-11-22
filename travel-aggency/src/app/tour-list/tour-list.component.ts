import {Component, OnInit} from '@angular/core';
import {Tour, TourFilter} from '../model/app-models';
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

  filter(filer: TourFilter) {
    this.getProducts();
    this.tours = this.tours.filter(e => {
        return filer.category.indexOf(e.category.valueOf()) !== -1;
      }
    );
    this.tours = this.tours.filter(e => {
        return filer.maxPrice >= e.price;
      }
    );
    this.tours = this.tours.filter(e => {
        return filer.minPrice <= e.price;
      }
    );
    this.tours = this.tours.filter(e => {
        return filer.maxOpinion >= e.opinion;
      }
    );
    this.tours = this.tours.filter(e => {
        return filer.minOpinion <= e.opinion;
      }
    );
  }

}




