import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AppUser} from './model/app-models';
import {ShoppingCartService} from './shopping-cart.service';
import {AngularFireAuth} from '@angular/fire/auth';
import User from '../../node_modules/firebase';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {UserService} from "./user.service";


@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<AppUser>;
  public currentUser: Observable<AppUser>;
  public data: AngularFireList<any[]>;

  // readonly authState$: Observable<firebase.User | null> = this.fireAuth.authState;


  constructor(private http: HttpClient, private shoppingCartService: ShoppingCartService,
              private fireAuth: AngularFireAuth,
              private db: AngularFireDatabase, private userService: UserService) {
    this.currentUserSubject = new BehaviorSubject<AppUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): AppUser {
    return this.currentUserSubject.value;
  }

  // login(username: string, password: string): Observable<AppUser> {
  //
  //   //return this.fireAuth.signInWithEmailAndPassword(username, password);
  //
  //
  //   return this.http.post<any>(`/users/authenticate`, {username, password})
  //     .pipe(map(user => {
  //       // login successful if there's a jwt token in the response
  //       if (user && user.token) {
  //         // store user details and jwt token in local storage to keep user logged in between page refreshes
  //         localStorage.setItem('currentUser', JSON.stringify(user));
  //         this.currentUserSubject.next(user);
  //       }
  //
  //       return user;
  //     }));
  // }

  login(email: string, password: string): boolean {

    this.fireAuth.signInWithEmailAndPassword(email, password);
    let retValue = false;
    this.fireAuth.authState.subscribe(e => {
      console.log(e);
      if (e != null) {
        console.log(e.uid);
        const user = this.userService.getUser(e.uid);
        if (user != null) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          retValue = true;
          return true;
        }
      }
    });
    return retValue;


  }

  logout() {

    this.shoppingCartService.clearCart();
    this.fireAuth.signOut();

    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);

  }

  public register(user: AppUser): boolean {
    let retValue = true;
    let uid;
    const iud = this.fireAuth.createUserWithEmailAndPassword(user.email, user.password).then(e => {
      console.log(e.user.uid);
      uid = e.user.uid;
      this.userService.register(user, uid);
      this.login(user.email, user.password);
      retValue = true;
    })
      .catch(e => {
        retValue = false;
      });

    return retValue;
  }
}
