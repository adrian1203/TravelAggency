import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppUser} from './model/app-models';
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
    return this.db.object('ztwprojekt/users/' + uid).set(user);
  }

  delete(id: number) {
    return this.http.delete(`/users/${id}`);
  }

  public getUser(uid: string): Observable<any> {

    return this.db.object('ztwprojekt/users/' + uid).valueChanges();

    // let user: AppUser = new AppUser();
    // obser.subscribe(e => {
    //   user = e as AppUser;
    //   console.log(user);
    // });
    // return user;


  }
}
