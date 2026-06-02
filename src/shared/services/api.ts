import type { GoogleMapInfo } from '../models/googleMapApi';
import type { UserLogin } from '../models/user';
import type { Visitor } from '../models/visitor';

// Use relative paths so Vite proxy forwards them to the backend (avoids CORS in dev).
// The vite.config.ts proxy forwards /api → https://arch360api.pisquare360.com/api
const TAXI_API  = '/api/TaxiPilotAPI/';
const EMAIL_API = '/api/EmailSender/';
const MAP_API   = '/api/GoogleMapAPI/';

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  return res.json() as Promise<T>;
}

// ── Users ──────────────────────────────────────────────────────────────────

export async function fetchUsers(): Promise<UserLogin[]> {
  const res = await fetch(`${TAXI_API}fetchUserFields`);
  return handleResponse<UserLogin[]>(res);
}

export async function fetchUserById(id: number): Promise<UserLogin> {
  const res = await fetch(`${TAXI_API}fetchUser/${id}`);
  return handleResponse<UserLogin>(res);
}

export async function fetchUserByEmail(email: string): Promise<UserLogin | null> {
  const res = await fetch(`${TAXI_API}fetchUserLoginByEmail/${encodeURIComponent(email)}`);
  if (res.status === 404) return null;
  return handleResponse<UserLogin>(res);
}

export async function insertUser(user: UserLogin): Promise<UserLogin> {
  const formData = new FormData();
  Object.entries(user).forEach(([k, v]) => {
    if (v !== undefined && v !== null) formData.append(k, String(v));
  });
  const res = await fetch(`${TAXI_API}insertUserLogin`, { method: 'POST', body: formData });
  return handleResponse<UserLogin>(res);
}

// ── Google Maps ────────────────────────────────────────────────────────────

export async function getGoogleMapInfo(
  apCharges: string,
  radiusDistance: string,
  pickupDateTime: string,
  driverLocation: string,
  pickup: string,
  dest: string,
): Promise<GoogleMapInfo> {
  // Path segments: encode only spaces (matches Angular HttpClient behaviour — colons stay as-is)
  const p = (s: string) => s.replace(/ /g, '%20');
  const url = `${MAP_API}getRouteInfo/${apCharges}/${radiusDistance}/${p(pickupDateTime)}/${p(driverLocation)}/${p(pickup)}?dest=${encodeURIComponent(dest)}`;
  const res = await fetch(url);
  return handleResponse<GoogleMapInfo>(res);
}

// ── Email ──────────────────────────────────────────────────────────────────

function buildVerificationEmailHtml(fromEmail: string, verifyUrl: string): string {
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:24px;border:1px solid #eee;border-radius:8px;">
      <h2 style="color:#ffc107;">TaxiPilot – Email Verification</h2>
      <p>Thank you for registering with TaxiPilot. Please verify your email address by clicking the button below.</p>
      <a href="${verifyUrl}" style="display:inline-block;margin:16px 0;padding:12px 28px;background:#ffc107;color:#1a1a1a;font-weight:700;text-decoration:none;border-radius:4px;">Verify Email</a>
      <p style="color:#888;font-size:12px;">From: ${fromEmail}</p>
    </div>`;
}

export async function sendVerificationEmail(recipientEmail: string): Promise<void> {
  // verifyUrl must be absolute — it goes inside an email body link
  const verifyUrl = `https://arch360api.pisquare360.com/api/EmailSender/verify-email/email?email=${encodeURIComponent(recipientEmail)}`;
  const htmlBody = buildVerificationEmailHtml('info@thearch360.com', verifyUrl);
  const emailRequest = { recipientEmail, subject: 'Verification', body: htmlBody };

  await fetch(`${EMAIL_API}sendEmail`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(emailRequest),
  });
}

// ── Visitors ───────────────────────────────────────────────────────────────

export async function getVisitors(filters?: { page?: number; limit?: number; search?: string }): Promise<Visitor[]> {
  const params = new URLSearchParams();
  if (filters?.page)   params.set('page', String(filters.page));
  if (filters?.limit)  params.set('limit', String(filters.limit));
  if (filters?.search) params.set('search', filters.search);
  const res = await fetch(`${TAXI_API}fetchVisitors?${params}`);
  return handleResponse<Visitor[]>(res);
}

export async function insertVisitor(visitor: Visitor): Promise<Visitor> {
  const res = await fetch(`${TAXI_API}insertVisitor`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(visitor),
  });
  return handleResponse<Visitor>(res);
}

export async function deleteVisitor(id: number): Promise<void> {
  await fetch(`${TAXI_API}deleteVisitor/${id}`, { method: 'DELETE' });
}
