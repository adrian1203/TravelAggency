import {Component, Input, OnInit} from '@angular/core';
import {Cart, Tour, TourFilter} from '../model/app-models';
import {ToursService} from "../tours.service";
import {ShoppingCartService} from "../shopping-cart.service";


@Component({
  selector: 'app-tour-list',
  templateUrl: './tour-list.component.html',
  styleUrls: ['./tour-list.component.css']
})
export class TourListComponent implements OnInit {
  tours: Array<Tour> = new Array<Tour>();
  allReservedPlaces = 0;
  maxPrice = 10000;
  minPrice = 0;
  @Input() isAdminView: boolean;

  cart: Cart;

  constructor(private toursService: ToursService,
              private shoppingCartService: ShoppingCartService) {

    this.shoppingCartService.cart.subscribe(x => this.cart = x);

  }

  ngOnInit() {
    this.getProducts();
    this.calculatePrice();
  }

  countReservedPlaces() {
    let resevedPlaces = 0;
    this.tours.forEach(
      e => resevedPlaces += e.reservePlaces);
    this.allReservedPlaces = resevedPlaces;
  }

  deleteTour(tour: Tour) {
    this.toursService.deleteTours(tour._id);
    this.tours = this.tours.filter(e => e !== tour);
  }

  getProducts() {
    this.toursService.getTours().subscribe(e => {
      this.tours = e;
      console.log(this.tours);
    });
  }


  calculatePrice() {
    this.maxPrice = this.tours.reduce((p, c) => p.price > c.price ? p : c).price;
    this.minPrice = this.tours.reduce((p, c) => p.price < c.price ? p : c).price;
  }

  filter(filer: TourFilter) {
    this.toursService.getTours().subscribe(e => {
      this.tours = e;
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
    });
  }
}





