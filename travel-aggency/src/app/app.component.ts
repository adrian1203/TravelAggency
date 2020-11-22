import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User} from './model/app-models';
import {AuthenticationService} from './autentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'travel-aggency';

  currentUser: User;

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

  }

  ngOnInit() {
    this.router.navigate(['./tour-list']);
  }
}
