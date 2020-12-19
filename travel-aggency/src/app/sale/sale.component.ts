import {Component, OnInit} from '@angular/core';
import {SaleService} from '../_service/sale.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {

  areSale: boolean;
  private docSub: Subscription;
  text: any;

  constructor(private saleService: SaleService) {
  }

  ngOnInit(): void {
    this.docSub = this.saleService.startSale.subscribe(e => {
      console.log('starteeee');
      console.log(e);
      this.areSale = true;
      this.text = e;

    });
    this.docSub = this.saleService.endSale.subscribe(e => {
      console.log(e);
      this.areSale = false;
      this.text = e;

    });
  }

}
