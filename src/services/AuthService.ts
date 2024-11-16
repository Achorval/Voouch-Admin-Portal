// src/services/AuthService/index.ts
import { User } from '../types/AuthTypes';
import LocalStorageUtil from '@/utilities/storage';
import HttpService from '@/services/HttpService';
import { SignInCredentials, SignUpCredentials, ForgotPasswordForm, AuthResponse } from '../types/AuthTypes';

const ACCESS_TOKEN_KEY = '@accessToken';

class AuthService {

  // Token management
  static async getAccessToken(): Promise<string | null> {
    return LocalStorageUtil.get<string>(ACCESS_TOKEN_KEY);
  }

  static async setAccessToken(token: string): Promise<void> {
    await LocalStorageUtil.set(ACCESS_TOKEN_KEY, token);
  }

  private static async removeAccessToken(): Promise<void> {
    await LocalStorageUtil.remove(ACCESS_TOKEN_KEY);
  }

  static async getCurrentUser(accessToken: string): Promise<User> {
    const response = await HttpService.post<User>('/api/v1/auth/me', { accessToken });
    return response;
  }
  
  static async signIn(credentials: SignInCredentials): Promise<AuthResponse> {
    const response = await HttpService.post<AuthResponse>('/api/v1/auth/login', credentials); 
    // await this.setAccessToken(response.data.accessToken);
    return response;
  }

  static async signUp(data: SignUpCredentials): Promise<AuthResponse> {
    const response = await HttpService.post<AuthResponse>(
      '/auth/register',
      data
    );
    return response;
  }

  static async forgotPassword(email: ForgotPasswordForm): Promise<void> {
    await HttpService.post('/auth/forgot-password', { email });
  }

  static async resetPassword(token: string, password: string): Promise<void> {
    await HttpService.post('/auth/reset-password', {
      token,
      password,
    });
  }

  static async signOut(): Promise<void> {
    try {
      // Optional: Call logout endpoint if needed
      await HttpService.post('/auth/logout');
    } finally {
      // Always clear token even if logout request fails
      await this.removeAccessToken();
      window.location.href = window.location.href;

    }
  }

  // Verification methods if needed
  static async verifyEmail(token: string): Promise<void> {
    await HttpService.post('/auth/verify-email', { token });
  }

  static async resendVerification(email: string): Promise<void> {
    await HttpService.post('/auth/resend-verification', { email });
  }
}

export default AuthService;