import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, from, Observable} from 'rxjs';
import {AppUser} from '../model/app-models';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {UserService} from './user.service';
import {Router} from '@angular/router';


@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<AppUser>;
  public currentUser: Observable<AppUser>;
  public data: AngularFireList<any[]>;
  private token: BehaviorSubject<string>;

  constructor(private router: Router, private http: HttpClient,
              private fireAuth: AngularFireAuth,
              private db: AngularFireDatabase, private userService: UserService) {
    this.currentUserSubject = new BehaviorSubject<AppUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.token = new BehaviorSubject<string>(JSON.parse(localStorage.getItem('token')));

  }

  public get currentUserValue(): AppUser {
    return this.currentUserSubject.value;
  }

  public getToken(): string {
    return this.token.value;
  }

  login(email: string, password: string) {
    return this.fireAuth.signInWithEmailAndPassword(email, password).then(data => {
      data.user.getIdToken(true).then(token => {
        localStorage.setItem('token', JSON.stringify(token));
        this.token.next(token);

        this.userService.getUser(data.user.uid, this.getToken()).subscribe(e => {
            const user = e;
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return user;
          },
          error => {
            return error;
          });
      });
    });
  }

  updateUser(user: AppUser) {
    this.userService.updateUser(user, this.getToken()).subscribe(e => {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
    });
  }

  logout() {
    this.fireAuth.signOut();
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    localStorage.removeItem('token');
    this.token.next(null);
    this.router.navigate(['./tour-list']);

  }

  register(user: AppUser) {
    return this.fireAuth.createUserWithEmailAndPassword(user.email, user.password);

  }
}
