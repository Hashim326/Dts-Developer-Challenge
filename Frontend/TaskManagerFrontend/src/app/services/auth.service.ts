/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = ' https://localhost:7101/api/auth';

  constructor(private http: HttpClient) {}

  public login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }

  public signUp(name: string, email: string, password: string): Observable<any> {{
    return this.http.post<any>(`${this.apiUrl}/register`, { email, password, name })
  }}

  public logout(): void {
    localStorage.removeItem('token');
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
