import {Injectable} from '@angular/core';
import {Tour} from './model/tour-model';

@Injectable({
  providedIn: 'root'
})
export class ToursService {

  loremTest = ' is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book';

  constructor() {
  }


  getFakeDate(): Array<Tour> {
    const tour: Tour = new Tour();
    tour.id = 1;
    tour.name = 'Poland tour';
    tour.country = 'Poland';
    tour.description = this.loremTest;
    tour.startDate = new Date(2020, 3, 23);
    tour.endDate = new Date(2020, 3, 30);
    tour.price = 400;
    tour.places = 40;
    tour.pictureLink = 'https://i.ibb.co/KKPMzFr/italy1.jpg'
    tour.category = 'Domestic'
    const tour1: Tour = new Tour();
    tour1.id = 2;
    tour1.name = 'Italy tour';
    tour1.country = 'Italy';
    tour1.description = this.loremTest;
    tour1.startDate = new Date(2020, 3, 23);
    tour1.endDate = new Date(2020, 3, 30)
    tour1.price = 1203;
    tour1.places = 35;
    tour1.pictureLink = 'https://i.ibb.co/KKPMzFr/italy2.jpg'
    tour1.category = 'Europe Trip'
    const tour3: Tour = new Tour();
    tour3.id = 3;
    tour3.name = 'Spain tour';
    tour3.country = 'Hiszpania';
    tour3.description = this.loremTest;
    tour3.endDate = new Date(2020, 3, 30)
    tour3.startDate = new Date(2020, 3, 23);
    tour3.price = 600;
    tour3.places = 20;
    tour3.pictureLink = 'https://i.ibb.co/KKPMzFr/italy1.jpg';
    tour3.category = 'Europe Trip'

    const tours: Array<Tour> = new Array<Tour>();
    tours.push(tour);
    tours.push(tour1);
    tours.push(tour3);

    return tours;


  }


  getProducts(): Array<Tour> {
    return this.getFakeDate();
  }

  getProduct(id: number): Tour {
    return this.getFakeDate().filter(e => e.id === id)[0];
  }

  addProduct(tour: Tour) {

    console.log(tour);

  }

  deleteProduct(id: number) {

  }

}
