export interface Visitor {
  id?: number;
  sessionId?: string;
  deviceType?: string;
  browser?: string;
  os?: string;
  ipAddress?: string;
  latitude?: number;
  longitude?: number;
  city?: string;
  country?: string;
  isLoggedIn?: boolean;
  bookingAttempts?: number;
  priceEnquiries?: number;
  pageVisits?: number;
  firstVisit?: string;
  lastVisit?: string;
  deletedFlag?: boolean;
}
