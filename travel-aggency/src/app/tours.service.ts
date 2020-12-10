import {Injectable} from '@angular/core';
import {AppUser, Tour, Vote} from './model/app-models';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ToursService {

  loremTest = ' is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book';
  public data: AngularFireList<any[]>;

  constructor(private db: AngularFireDatabase,
              private http: HttpClient) {
  }


  getFakeDate(): Array<Tour> {
    const gallery: Array<string> = new Array<string>();
    gallery.push('https://i.ibb.co/KKPMzFr/italy1.jpg');
    gallery.push('https://i.ibb.co/KKPMzFr/italy2.jpg');
    gallery.push('https://i.ibb.co/KKPMzFr/italy2.jpg');

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
    tour1.gallery = gallery;
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

  updateTour(tour: Tour) {

  }

  createTour() {

    const votes: Array<Vote> = new Array<Vote>();
    const vote1 = new Vote();
    vote1.vote = 3;
    const vote2 = new Vote();
    vote2.vote = 3;
    votes.push(vote1);
    votes.push(vote2);

    // const commects : Array<Comment> = new Array<Comment>();
    // const commenct = new Com();

    const gallery: Array<string> = new Array<string>();
    gallery.push('https://i.ibb.co/KKPMzFr/italy1.jpg');
    gallery.push('https://i.ibb.co/KKPMzFr/italy2.jpg');
    gallery.push('https://i.ibb.co/KKPMzFr/italy2.jpg');

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
    tour.votes = votes;


    this.http
      .post<Tour>('http://localhost:5010/tours', tour)
      .subscribe(e => {
        return console.log(e);

      });
  }

  getTours(): Observable<Tour[]> {
    return this.http.get<Tour[]>('http://localhost:5010/tours');
  }


}
