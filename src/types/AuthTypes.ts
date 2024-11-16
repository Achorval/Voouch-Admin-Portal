// src/services/AuthService/types.ts
export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: string;
  status: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
}

export interface SignInCredentials {
  identifier: string;
  password: string;
}

export interface SignUpCredentials {
  email: string;
  password: string;
}

// export interface AuthResponse1 {
//   status: boolean;
//   message: string;
//   data?: {
//     accessToken: string
//   };
// }

export interface ForgotPasswordForm {
  email: string;
};

export interface ResetPasswordForm {
  newPassword: string;
  confirmNewPassword: string;
};

export interface AuthResponse {
  status: boolean;
  message: string;
  data?: {
    accessToken: string;
    user: User;
  };
}