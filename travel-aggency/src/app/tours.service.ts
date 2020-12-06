import {Injectable} from '@angular/core';
import {AppUser, Tour, TourInstance} from './model/app-models';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class ToursService {

  loremTest = ' is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book';
  public data: AngularFireList<any[]>;

  constructor(private db: AngularFireDatabase) {
  }


  getFakeDate(): Array<Tour> {
    const gallery: Array<string> = new Array<string>();
    gallery.push('https://i.ibb.co/KKPMzFr/italy1.jpg');
    gallery.push('https://i.ibb.co/KKPMzFr/italy2.jpg');
    gallery.push('https://i.ibb.co/KKPMzFr/italy2.jpg');


    const tourInstances: Array<TourInstance> = new Array<TourInstance>();
    const tourInstance: TourInstance = new TourInstance();
    tourInstance.startDate = new Date(2020, 3, 23);
    tourInstance.startDate = new Date(2020, 3, 30);
    tourInstance.reservedPlace = 0;
    tourInstances.push(tourInstance);

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
    tour.opinion = 4.5;
    tour.gallery = gallery;
    tour.tourInstances = tourInstances;
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
    tour1.opinion = 3.9;
    tour1.gallery = gallery;
    tour1.tourInstances = tourInstances;
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
    tour3.opinion = 3.4;
    tour3.gallery = gallery;
    tour3.tourInstances = tourInstances;
    const tours: Array<Tour> = new Array<Tour>();
    tours.push(tour);
    tours.push(tour1);
    tours.push(tour3);

    return tours;


  }


  getProducts(): Array<Tour> {
    console.log(this.getFakeDate());

    console.log(this.db.list('/ztwprojekt/users').valueChanges().subscribe(e => console.log(e)));
    this.data = this.db.list('ztwprojekt');
    const user: AppUser = new AppUser();
    user.firstName = 'Adrian';
    user.lastName = 'Opiela';
    user.email = 'travel@gmail.cowwm'
    user.password = 'waa'
    user.id = 1;
    // const tmp = this.db.object('ztwprojekt/users/1').set(user);
    // console.log(tmp);
    // this.db.list('/ztwprojekt/users/').
    // this.db.list('MNEdoTI4wvlpkCZtucS').valueChanges();
    // console.log(this.db.object('ztwprojekt/MNEdf4Zcs95fWioq9Jn'));
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
