import {Injectable} from '@angular/core';
import {AppUser, Tour, Vote} from './model/app-models';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ToursService {

  loremTest = ' is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book';
  public data: AngularFireList<any[]>;

  constructor(private db: AngularFireDatabase,
              private http: HttpClient) {
  }

  createTour(tour: Tour) {
    this.http
      .post<Tour>('http://localhost:5010/tours', tour)
      .subscribe(e => {
        return console.log(e);

      });
  }

  getTours(): Observable<Tour[]> {
    return this.http.get<Tour[]>('http://localhost:5010/tours');
  }

  getTour(id: string): Observable<Tour> {
    return this.http.get<Tour>('http://localhost:5010/tours/' + id);
  }

  deleteTours(id: string) {
    console.log(id);
    this.http.delete('http://localhost:5010/tours/' + id).subscribe(e => console.log(e));
  }

  updateTour(tour: Tour) {
    console.log('uDUPA');
    console.log(tour);
    if (tour.votes.length > 0) {
      let sum = 0;
      tour.votes.forEach(e => sum += e.vote);
      tour.opinion = sum / tour.votes.length;
    }
    this.http.post<Tour>('http://localhost:5010/tours/' + tour._id, tour)
      .subscribe(e => console.log(e));
  }


}
