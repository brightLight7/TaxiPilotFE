import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {

  sections = {
    title: "Bookings Overview",
    items: [
      { label: "New", value: 5 },
      { label: "Ongoing", value: 12 },
      { label: "Completed", value: 120 },
      { label: "Cancelled", value: 3 }
    ]
  };


  bookings = {
    new: 5,
    ongoing: 12,
    completed: 120,
    cancelled: 3
  };

  drivers = {
    online: 15,
    offline: 8,
    pending: 2
  };

  customers = {
    total: 500,
    newSignups: 10,
    active: 300
  };

  payments = {
    todayEarnings: 3200,
    pendingPayments: 4,
    refunds: 2
  };

  reports = {
    totalRides: 1000,
    revenue: 50000,
    driverRatings: 4.8
  };
}
