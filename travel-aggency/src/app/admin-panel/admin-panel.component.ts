import {Component, OnInit} from '@angular/core';
import {SaleService} from "../_service/sale.service";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  message = "";

  constructor(private saleService: SaleService) {
  }

  ngOnInit(): void {
  }

  startSale() {
    this.saleService.startSaleRequest(this.message);
  }

  endSale() {
    this.saleService.endSaleRequest();
  }

}
