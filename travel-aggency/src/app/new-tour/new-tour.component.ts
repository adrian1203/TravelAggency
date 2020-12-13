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
  galleryLinks: Array<string> = new Array<string>();
  link: string;

  constructor(private tourService: ToursService) {
  }

  ngOnInit() {
  }

  save() {
    this.tour.gallery = this.galleryLinks;
    this.tourService.createTour(this.tour);
    this.tour = new Tour();
  }

  addLink() {
    this.galleryLinks.push(this.link);
    this.link = '';
  }

  deleteLink(link: string) {
    this.galleryLinks = this.galleryLinks.filter(e => e !== link);
  }

}
