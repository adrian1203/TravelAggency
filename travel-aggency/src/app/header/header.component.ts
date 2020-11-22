import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../autentication.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  logOut(){
    this.authenticationService.logout();
  }
}
