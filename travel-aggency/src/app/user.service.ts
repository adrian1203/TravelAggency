import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppUser, Tour} from './model/app-models';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/database";
import {Observable} from "rxjs";


@Injectable({providedIn: 'root'})
export class UserService {

  public data: AngularFireList<any[]>;

  constructor(private http: HttpClient,
              private db: AngularFireDatabase) {
  }

  getAll() {
    return this.http.get<AppUser[]>(`/users`);
  }

  register(user: AppUser, uid: string) {
    user._id = uid;
    return this.http
      .post<AppUser>('http://localhost:5010/users', user);

  }

  delete(id: number) {
    return this.http.delete(`/users/${id}`);
  }

  public getUser(uid: string): Observable<AppUser> {

    return this.http.get<AppUser>('http://localhost:5010/users/' + uid);

    // return this.db.object('ztwprojekt/users/' + uid).valueChanges();


  }

  updateUser(user: AppUser) {
    console.log(user);
    return this.http
      .post<AppUser>('http://localhost:5010/users/' + user._id, user);

  }
}
