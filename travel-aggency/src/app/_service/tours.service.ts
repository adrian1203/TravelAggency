import {Injectable} from '@angular/core';
import {Tour} from '../model/app-models';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from './autentication.service';
import {AlertService} from './alert.service';


@Injectable({
  providedIn: 'root'
})
export class ToursService {

  loremTest = ' is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book';
  public data: AngularFireList<any[]>;

  constructor(private db: AngularFireDatabase,
              private http: HttpClient,
              private authenticationService: AuthenticationService, private alertService: AlertService) {
  }

  createTour(tour: Tour) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.authenticationService.getToken()
      })
    };
    this.http
      .post<Tour>('http://localhost:5010/tours', tour, httpOptions)
      .subscribe(e => {
        this.alertService.success('Created tours :' + tour.name);
      });
  }

  getTours(): Observable<Tour[]> {
    return this.http.get<Tour[]>('http://localhost:5010/tours');
  }

  getTour(id: string): Observable<Tour> {
    return this.http.get<Tour>('http://localhost:5010/tours/' + id);
  }

  deleteTours(id: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.authenticationService.getToken()
      })
    };
    this.http.delete('http://localhost:5010/tours/' + id, httpOptions).subscribe(e => {
      this.alertService.success('Deleted tours');
    });
  }

  updateTour(tour: Tour): Observable<any> {
    if (tour.votes.length > 0) {
      let sum = 0;
      tour.votes.forEach(e => sum += e.vote);
      tour.opinion = sum / tour.votes.length;
    }
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.authenticationService.getToken()
      })
    };
    return this.http.post<Tour>('http://localhost:5010/tours/' + tour._id, tour, httpOptions);

  }


}
