import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  menuItems$: Observable<string[]> = of([
    'Booking', 'Drivers', 'Companies', 'Customers', 'Employees', 'Visitors'
  ]);
  activeItem: string = 'Booking';

  ngOnInit(): void {
  console.log(this.menuItems$);
  }


  setActive(item: string) {
    this.activeItem = item;
  }
}
