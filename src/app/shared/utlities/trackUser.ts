import { TaxipilotService } from './../services/taxipilot.service';
import { Visitor } from '../models/visitor.model';

/**
 * Tracks user details and sends them to the server.
 * @param taxiPilotService - The TaxipilotService instance to send data.
 */
export function trackUser(taxiPilotService: TaxipilotService): void {
  const visitor: Visitor = {
    id: 0, // Auto-generated in DB
    sessionId: crypto.randomUUID(), // Generate unique session ID
    ipAddress: 'Unknown', // Default value to avoid null issues
    deviceType: getDeviceType() || 'Unknown',
    browser: getBrowserInfo() || 'Unknown',
    operatingSystem: getOSInfo() || 'Unknown',
    referrerUrl: document.referrer || '',
    pageVisited: window.location.href,
    visitTimestamp: new Date(),
    exitTimestamp: new Date(),
    country: '',
    city: '',
    region: '',
    postalCode: '',
    latitude: 0,
    longitude: 0,
    deviceInfo: navigator.userAgent,
    userAgent: navigator.userAgent,
    loginStatus: false,
    userId: 0,
    bookingAttempt: false,
    rideId: 0,
    isBot: /bot|googlebot|crawler|spider|robot|crawling/i.test(navigator.userAgent),
    visitedCounter: 1,
    minutesSpent: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedFlag: false
  };

  // Fetch IP and geolocation details from API
  fetch('https://ipapi.co/json/')
    .then(response => response.json())
    .then(data => {
      visitor.ipAddress = data.ip || 'Unknown';
      visitor.country = data.country_name || 'Unknown';
      visitor.city = data.city || 'Unknown';
      visitor.region = data.region || 'Unknown';
      visitor.postalCode = data.postal || 'Unknown';
      visitor.latitude = data.latitude ?? 0;
      visitor.longitude = data.longitude ?? 0;

      console.log("🚀 Visitor Data Before Insertion:", visitor); // ✅ Debugging

      // Insert visitor data
      insertVisitorData(taxiPilotService, visitor);
    })
    .catch(error => {
      console.error('❌ Error fetching IP data:', error);

      // If IP API fails, insert visitor without geolocation
      insertVisitorData(taxiPilotService, visitor);
    });
}

/**
 * Inserts visitor data into the database.
 * @param taxiPilotService The service used to insert visitor data.
 * @param visitor The visitor object to insert.
 */
function insertVisitorData(taxiPilotService: TaxipilotService, visitor: Visitor) {
  taxiPilotService.insertVisitor(visitor).subscribe({
    next: () => console.log('✅ Visitor inserted successfully'),
    error: (err: any) => console.error('❌ Error inserting visitor:', err)
  });
}

/**
 * Detects the user's browser type.
 */
function getBrowserInfo(): string {
  const userAgent = navigator.userAgent;
  if (userAgent.includes('Chrome')) return 'Chrome';
  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'Safari';
  if (userAgent.includes('Edge')) return 'Edge';
  if (userAgent.includes('MSIE') || userAgent.includes('Trident')) return 'Internet Explorer';
  return 'Unknown';
}

/**
 * Detects the user's operating system.
 */
function getOSInfo(): string {
  const userAgent = navigator.userAgent;
  if (userAgent.includes('Win')) return 'Windows';
  if (userAgent.includes('Mac')) return 'MacOS';
  if (userAgent.includes('Linux')) return 'Linux';
  if (userAgent.includes('Android')) return 'Android';
  if (userAgent.includes('like Mac') || userAgent.includes('iPhone') || userAgent.includes('iPad')) return 'iOS';
  return 'Unknown';
}

/**
 * Determines whether the visitor is using a mobile, tablet, or desktop.
 */
function getDeviceType(): string {
  const userAgent = navigator.userAgent;
  if (/Mobi|Android/i.test(userAgent)) return 'Mobile';
  if (/Tablet|iPad/i.test(userAgent)) return 'Tablet';
  return 'Desktop';
}
