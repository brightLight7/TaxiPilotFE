export interface UserLogin {
  id?: number;
  firstName: string;
  lastName: string;
  emailHash: string;
  phoneNumber: string;
  passwordHash: string;
  confirmPassword?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  postCode?: string;
  country?: string;
  isEmailVerified?: boolean;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  roleId?: number;
  sessionId?: string;
  deviceType?: string;
  browser?: string;
  os?: string;
  ipAddress?: string;
  latitude?: number;
  longitude?: number;
  notRobot?: boolean;
}

export const initialUserLogin: UserLogin = {
  firstName: '',
  lastName: '',
  emailHash: '',
  phoneNumber: '',
  passwordHash: '',
};

export interface UserLoginAttempt {
  emailHash: string;
  passwordHash: string;
  attemptTime?: string;
  ipAddress?: string;
}

export interface UserPasswordReset {
  emailHash: string;
  token: string;
  expiresAt?: string;
}
