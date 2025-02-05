import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SignInData } from '../model/signInData';

interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly TOKEN_KEY = 'auth-token';
  isAuthenticated = false;

  constructor(private http: HttpClient, private router: Router) {
    this.checkToken();
  }

  authenticate(signInData: SignInData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('http://localhost:8093/api/auth/login', {
      usu_login: signInData.getLogin(),
      usu_pass: signInData.getPassword()
    }).pipe(
      tap(response => {
        localStorage.setItem(this.TOKEN_KEY, response.access_token);
        this.isAuthenticated = true;
        this.router.navigate(['home']);
      })
    );
  }

  logout() {
    this.isAuthenticated = false;
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['']);
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticated || !!localStorage.getItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private checkToken() {
    const token = this.getToken();
    if (token) {
      this.isAuthenticated = true;
    }
  }
}
