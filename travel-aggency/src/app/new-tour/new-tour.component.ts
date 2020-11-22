import {Component, OnInit} from '@angular/core';
import {Tour} from '../model/app-models';
import {ToursService} from '../tours.service';

@Component({
  selector: 'app-new-tour',
  templateUrl: './new-tour.component.html',
  styleUrls: ['./new-tour.component.css']
})
export class NewTourComponent implements OnInit {

  tour: Tour = new Tour();

  constructor(private tourService: ToursService) {
  }

  ngOnInit() {
  }

  save() {
    this.tourService.addProduct(this.tour);
    this.tour = new Tour();
  }

}
