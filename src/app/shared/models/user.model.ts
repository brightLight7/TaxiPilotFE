export interface UserLogin {
  id: number;
  usernameHash: string;
  passwordHash?: string;
  userType?: string;
  emailHash?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  phoneNumberHash?: string;
  mobileNumberHash?: string;
  dobHash?: string;
  companyIdHash?: string;
  houseNo?: string;
  street?: string;
  town?: string;
  county?: string;
  country?: string;
  postCode?: string;
  createdDate: Date;
  updatedDate: Date;
  deletedFlag: boolean;
}

export const initialUserLogin: UserLogin = {
  id: 0,
  usernameHash: '',
  passwordHash: undefined,
  userType: undefined,
  emailHash: undefined,
  firstName: undefined,
  lastName: undefined,
  phoneNumber: undefined,
  phoneNumberHash: undefined,
  mobileNumberHash: undefined,
  dobHash: undefined,
  companyIdHash: undefined,
  houseNo: undefined,
  street: undefined,
  town: undefined,
  county: undefined,
  country: undefined,
  postCode: undefined,
  createdDate: new Date(), // Initialize with current date
  updatedDate: new Date(), // Initialize with current date
  deletedFlag: false, // Default boolean value
};


export interface UserLoginAttempt {
  id: number;
  userId: number;
  attemptTime: Date;
  isSuccessful: boolean;
  ipAddress?: string | null;
  created: Date;
  updated: Date;
  deletedFlag: boolean;
  user: UserLogin; // Optional based on usage, can be excluded if not needed
}

export interface UserPasswordReset {
  id: number;
  userId: number;
  resetToken: string;
  tokenExpiry: Date;
  isUsed: boolean;
  status?: string | null;
  created: Date;
  updated: Date;
  deletedFlag: boolean;
  user: UserLogin; // Optional based on usage, can be excluded if not needed
}
