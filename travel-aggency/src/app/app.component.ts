import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Cart, AppUser} from './model/app-models';
import {AuthenticationService} from './_service/autentication.service';
import {ShoppingCartService} from "./_service/shopping-cart.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'travel-aggency';

  currentUser: AppUser;

  constructor(private router: Router,
              private authenticationService: AuthenticationService, private shoppingCartService: ShoppingCartService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

  }

  ngOnInit() {
    this.router.navigate(['./tour-list']);
  }

  logOut() {
    this.shoppingCartService.clearCart();
    this.authenticationService.logout();
  }
}
