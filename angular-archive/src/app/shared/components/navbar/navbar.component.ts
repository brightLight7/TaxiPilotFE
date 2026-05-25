import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductFacade } from '../../../modules/product/state/product.facade';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  productsBasketCount$: Observable<number>;

  constructor(private productFacade: ProductFacade) { }

  ngOnInit(): void {
    //this.productFacade.loadProductBasketCountAdd(0);
    this.productsBasketCount$ = this.productFacade.productsBasketCount$;
  }

}
