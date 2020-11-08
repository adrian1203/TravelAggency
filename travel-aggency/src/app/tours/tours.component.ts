import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.css']
})
export class ToursComponent implements OnInit {

  tours: Array<Tour> = new Array<Tour>();
  loremTest = ' is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book';
  allReservedPlaces = 0;
  maxPrice: number;
  minPrice = 0;


  constructor() {
  }

  ngOnInit() {
    this.loadData();
    this.maxPrice = this.tours.reduce((p, c) => p.price > c.price ? p : c).price;
    this.minPrice = this.tours.reduce((p, c) => p.price < c.price ? p : c).price;

  }

  countReservedPlaces() {
    let resevedPlaces = 0;
    this.tours.forEach(
      e => resevedPlaces += e.reservePlaces)
    this.allReservedPlaces = resevedPlaces;
  }


  reservePlace(tour: Tour) {
    tour.reservePlaces = tour.reservePlaces + 1;
    this.countReservedPlaces();
  }

  resignationPlace(tour: Tour) {
    tour.reservePlaces = tour.reservePlaces - 1;
    this.countReservedPlaces();
  }


  loadData() {
    const tour: Tour = new Tour();
    tour.name = 'Poland tour';
    tour.country = 'Poland';
    tour.description = this.loremTest;
    tour.startDate = new Date(2020, 3, 23);
    tour.endDate = new Date(2020, 3, 30);
    tour.price = 400;
    tour.places = 40;
    tour.pictureLink = 'https://i.ibb.co/KKPMzFr/italy1.jpg'
    const tour1: Tour = new Tour();
    tour1.name = 'Italy tour';
    tour1.country = 'Italy';
    tour1.description = this.loremTest;
    tour1.startDate = new Date(2020, 3, 23);
    tour1.endDate = new Date(2020, 3, 30)
    tour1.price = 1203;
    tour1.places = 35;
    tour1.pictureLink = 'https://i.ibb.co/KKPMzFr/italy2.jpg'
    const tour3: Tour = new Tour();
    tour3.name = 'Spain tour';
    tour3.country = 'Hiszpania';
    tour3.description = this.loremTest;
    tour3.endDate = new Date(2020, 3, 30)
    tour3.startDate = new Date(2020, 3, 23);
    tour3.price = 600;
    tour3.places = 20;
    tour3.pictureLink = 'https://i.ibb.co/KKPMzFr/italy1.jpg'
    this.tours.push(tour);
    this.tours.push(tour1);
    this.tours.push(tour3)
    console.log(this.tours);

  }


}

class Tour {
  name: string;
  country: string;
  startDate: Date;
  endDate: Date;
  price: number;
  places: number;
  description: string;
  pictureLink: string;
  reservePlaces = 0;

}
