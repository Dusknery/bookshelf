import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private baseUrl = 'http://localhost:5070/api/auth';

  constructor(private http: HttpClient) {}

  register(data: any) {
    return this.http.post(`${this.baseUrl}/register`, data);
  }
  
  login(data: any) {
    return this.http.post<{ token: string}>(`${this.baseUrl}/login`, data);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

getToken() {
  return localStorage.getItem('token');
}

  logout() {
    localStorage.removeItem('token');
  }
}


