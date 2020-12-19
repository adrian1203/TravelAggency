import {Component, OnInit} from '@angular/core';
import {Tour} from '../model/app-models';
import {ToursService} from '../tours.service';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-new-tour',
  templateUrl: './new-tour.component.html',
  styleUrls: ['./new-tour.component.css']
})
export class NewTourComponent implements OnInit {

  toruId: string;
  tour: Tour = new Tour();
  galleryLinks: Array<string> = new Array<string>();
  link: string;
  isEditing = false;

  constructor(private tourService: ToursService,
              private route: ActivatedRoute, private router: Router
  ) {
  }

  ngOnInit() {
    this.route.data.subscribe();
    this.toruId = this.route.snapshot.paramMap.get('id');
    if (this.toruId !== 'undefined') {
      this.tourService.getTour(this.toruId).subscribe(e => {
        console.log(e);
        this.isEditing = true;
        this.tour = e;
        this.galleryLinks = this.tour.gallery;
        console.log(this.tour);
      });
    }
  }

  save() {
    this.tour.gallery = this.galleryLinks;
    this.tourService.createTour(this.tour);
    this.router.navigate(['./admin']);
  }

  update() {
    this.tour.gallery = this.galleryLinks;
    this.tourService.updateTour(this.tour);
    this.router.navigate(['./tour-detail/' + this.toruId]);

  }

  addLink() {
    this.galleryLinks.push(this.link);
    this.link = '';
  }

  deleteLink(link: string) {
    this.galleryLinks = this.galleryLinks.filter(e => e !== link);
  }

}
