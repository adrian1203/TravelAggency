import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AppUser, Comment, Tour, Vote} from '../model/app-models';
import {ToursService} from '../tours.service';
import {ShoppingCartService} from "../shopping-cart.service";
import {AuthenticationService} from "../autentication.service";

@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrls: ['./tour-detail.component.css']
})
export class TourDetailComponent implements OnInit {

  toruId: string;
  tour: Tour;
  dates: Array<Date> = new Array<Date>();
  opinion: number;
  currentUser: AppUser;
  comment: string;
  myVote: number;
  myComment: string;

  reservedPlaces: number;
  isReserved = false;

  constructor(
    private toursService: ToursService,
    private route: ActivatedRoute,
    private  authenticationService: AuthenticationService,
    private shoppingCartService: ShoppingCartService) {
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;
    });
  }


  ngOnInit(): void {
    this.route.data.subscribe();
    this.toruId = this.route.snapshot.paramMap.get('id');
    this.getTour();
    this.getDates();


  }

  getTour() {
    this.toursService.getTour(this.toruId).subscribe(e => {
      this.tour = e;
      this.shoppingCartService.getCart().elements.forEach(elem => {
        console.log(elem);
        if (elem.tour._id === this.tour._id) {
          this.isReserved = true;
          this.reservedPlaces = elem.amount;
          console.log('tuuutuu');
        }
      });
    });
  }

  getDates() {

    const start: Date = this.tour.startDate;
    for (let i = 0; i < 10; i++) {
      this.dates.push(new Date(start.getTime() + (i * 21 * 24 * 60 * 60 * 1000)));
    }

    console.log(this.dates);
  }

  checkIfVoted(): boolean {
    let retValue = false;
    this.tour.votes.forEach(e => {
      if (e.userId === this.currentUser._id) {
        this.myVote = e.vote;
        retValue = true;
      }
    });
    return retValue;
  }

  addOpinion() {
    const vote = new Vote();
    vote.userId = this.currentUser._id;
    vote.vote = this.opinion;
    this.tour.votes.push(vote);
    this.toursService.updateTour(this.tour);
  }

  addComment() {
    const comment = new Comment();
    comment.text = this.comment;
    comment.userId = this.currentUser._id;
    console.log(this.currentUser._id);
    this.tour.comments.push(comment);
    this.toursService.updateTour(this.tour);
  }

  checkIfHaveRights(): boolean {
    console.log(this.currentUser);
    console.log(this.toruId);
    let retvalue = false;
    if (this.currentUser !== null) {
      this.currentUser.reservation.forEach(e => {
        if (e.tourId === this.toruId) {
          retvalue = true;
        }
      });
    }
    return retvalue;
  }

  checkIfWroteComments(): boolean {
    let retValue = false;
    console.log(this.tour);
    this.tour.comments.forEach(e => {
      if (e.userId === this.currentUser._id) {
        this.myComment = e.text;
        retValue = true;
      }
    });
    return retValue;
  }

  reservePlace(tour: Tour) {
    this.shoppingCartService.addTour(tour, this.reservedPlaces);
    tour.reservePlaces = tour.reservePlaces + this.reservedPlaces;
    this.checkReservation();
  }

  resignationPlace(tour: Tour) {
    this.shoppingCartService.removeTour(tour);
    tour.reservePlaces = tour.reservePlaces - this.reservedPlaces;
    this.isReserved = false;
    this.reservedPlaces = 0;
  }

  checkReservation() {
    this.shoppingCartService.getCart().elements.forEach(e => {
      if (e.tour === this.tour) {
        this.isReserved = true;
      }
    });
  }
}
