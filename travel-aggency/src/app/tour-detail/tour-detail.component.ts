import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Tour} from '../model/app-models';
import {ToursService} from '../tours.service';

@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrls: ['./tour-detail.component.css']
})
export class TourDetailComponent implements OnInit {

  toruId: number;
  tour: Tour;
  dates: Array<Date> = new Array<Date>();

  constructor(
    private toursService: ToursService,
    private route: ActivatedRoute,
  ) {
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
}
