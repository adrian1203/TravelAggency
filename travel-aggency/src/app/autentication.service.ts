import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, from, Observable} from 'rxjs';
import {AppUser} from './model/app-models';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {UserService} from "./user.service";


@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<AppUser>;
  public currentUser: Observable<AppUser>;
  public data: AngularFireList<any[]>;

  // readonly authState$: Observable<firebase.User | null> = this.fireAuth.authState;


  constructor(private http: HttpClient,
              private fireAuth: AngularFireAuth,
              private db: AngularFireDatabase, private userService: UserService) {
    this.currentUserSubject = new BehaviorSubject<AppUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): AppUser {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.fireAuth.signInWithEmailAndPassword(email, password).then(data => {
      console.log(data.user.uid);
      this.userService.getUser(data.user.uid).subscribe(e => {
        const user = e;
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      });
    });
  }

  updateUser(user: AppUser) {
    this.userService.updateUser(user).subscribe(e => {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
    });
  }

  logout() {
    this.fireAuth.signOut();

    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);

  }

  register(user: AppUser) {
    return this.fireAuth.createUserWithEmailAndPassword(user.email, user.password);

  }
}
