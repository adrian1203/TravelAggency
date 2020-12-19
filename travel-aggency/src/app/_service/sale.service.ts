import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  startSale = this.socket.fromEvent('startSale');
  endSale = this.socket.fromEvent('endSale');


  constructor(private socket: Socket, private http: HttpClient) {
  }


  startSaleRequest(message: string) {
return      this.http.get('http://localhost:5010/sale').subscribe(e => e);
  }

  endSaleRequest() {
    return this.http.get('http://localhost:5010/sale-stop').subscribe(e => e);
  }
}
