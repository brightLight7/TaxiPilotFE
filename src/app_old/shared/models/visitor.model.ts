export interface Visitor {
  id?: number;  // ✅ Keep camelCase for Angular compatibility
  sessionId?: string;
  ipAddress: string;  // ✅ Use `ipAddress` instead of `IpAddress`
  deviceType: string;  // ✅ Use `deviceType` instead of `DeviceType`
  browser?: string;
  operatingSystem?: string;
  referrerUrl?: string;
  pageVisited?: string;
  visitTimestamp?: Date;
  exitTimestamp?: Date;
  country?: string;
  city?: string;
  region?: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
  deviceInfo?: string;
  userAgent?: string;
  loginStatus?: boolean;
  userId?: number;
  bookingAttempt?: boolean;
  rideId?: number;
  isBot?: boolean;
  visitedCounter?: number;
  minutesSpent?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedFlag?: boolean;
}
