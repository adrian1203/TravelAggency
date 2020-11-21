import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Tour} from "../model/tour-model";
import {ToursService} from "../tours.service";

@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrls: ['./tour-detail.component.css']
})
export class TourDetailComponent implements OnInit {

  toruId: number;
  tour: Tour;

  constructor(
    private toursService: ToursService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.route.data.subscribe()
    this.toruId = +this.route.snapshot.paramMap.get('id');
    this.getTour();
  }

  getTour() {
    this.tour = this.toursService.getProduct(this.toruId);
  }

  previousState() {
    window.history.back();
  }
}
