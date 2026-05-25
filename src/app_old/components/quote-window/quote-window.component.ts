import { PickupAddressService } from '../../shared/services/location-services/pickup-address.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-quote-window',
    templateUrl: './quote-window.component.html',
    styleUrls: ['./quote-window.component.scss']
})
export class QuoteWindowComponent implements OnInit {
  address = '';
  pcode = '';

  constructor(private pickupAddressService: PickupAddressService ) {


  }
  ngOnInit(): void {
   this.address = this.pickupAddressService.getLocation();
  }


}
