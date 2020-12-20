import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppUser, Tour} from '../model/app-models';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/database";
import {Observable} from "rxjs";

import {HttpHeaders} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class UserService {

  public data: AngularFireList<any[]>;

  constructor(private http: HttpClient,
              private db: AngularFireDatabase) {
  }


  register(user: AppUser, uid: string) {
    user._id = uid;
    return this.http
      .post<AppUser>('http://localhost:5010/users', user);

  }


  public getUser(uid: string, token: string): Observable<AppUser> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token
      })
    };

    return this.http.get<AppUser>('http://localhost:5010/users/' + uid, httpOptions);

  }

  updateUser(user: AppUser, token: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token
      })
    };
    return this.http
      .post<AppUser>('http://localhost:5010/users/' + user._id, user, httpOptions);

  }
}
