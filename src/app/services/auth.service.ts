// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticated: boolean = false;

  login(password: string): boolean {
    // Implement password validation logic here
    if (password === 'admin123') {
      this.authenticated = true;
      return true;
    }
    return false;
  }

  logout(): void {
    this.authenticated = false;
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }
}
