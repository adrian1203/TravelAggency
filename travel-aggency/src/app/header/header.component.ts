import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../autentication.service";
import {User} from "../model/app-models";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: User;

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.user = x);
  }

  ngOnInit() {
  }

  logOut() {
    this.authenticationService.logout();
  }
}
