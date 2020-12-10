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

  toruId: number;
  tour: Tour;
  dates: Array<Date> = new Array<Date>();
  opinion: number;
  currentUser: AppUser;
  comment: string;
  myVote: number;
  myComment: string;

  constructor(
    private toursService: ToursService,
    private route: ActivatedRoute,
    private  authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }


  ngOnInit(): void {
    this.route.data.subscribe()
    this.toruId = +this.route.snapshot.paramMap.get('id');
    this.getTour();
    this.getDates();
  }

  getTour() {
    this.tour = this.toursService.getProduct(this.toruId);
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
      if (e.user.id === this.currentUser.id) {
        this.myVote = e.vote;
        retValue = true;
      }
    })
    return retValue;
  }

  addOpinion() {
    const vote = new Vote();
    vote.user = this.currentUser;
    vote.vote = this.opinion;
    this.tour.votes.push(vote);
    this.toursService.updateTour(this.tour);
  }

  addComment() {
    const comment = new Comment();
    comment.text = this.comment;
    comment.user = this.currentUser;

    this.tour.comments.push(comment);
    this.toursService.updateTour(this.tour);
  }

  checkIfHaveRights(): boolean {
    if (this.currentUser === null) {
      return false;
    }

    // this.currentUser.reservation.forEach(e => {
    //   if (e.tour.id === this.tour.id) {
    //     return false;
    //   }
    // })

    return true;
  }

  checkIfWroteComments(): boolean {
    let retValue = false;
    console.log(this.tour);
    this.tour.comments.forEach(e => {
      if (e.user.id === this.currentUser.id) {
        this.myComment = e.text;
        retValue = true;
      }
    })
    return retValue;
  }
}
