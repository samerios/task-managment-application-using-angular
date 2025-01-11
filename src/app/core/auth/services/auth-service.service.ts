// auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';
import { jwtDecode } from 'jwt-decode';
import { LocalStorageService } from '../../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly api = `${environment.apiUrl}Auth`;

  constructor(private http: HttpClient, private localStorage: LocalStorageService, private router: Router, private userService: UserService) { }

  login(credentials: { emailOrUsername: string; password: string }): Observable<any> {
    return this.http.post<{ token: string }>(`${this.api}/login`, credentials);
  }

  logout() {
    this.userService.updateUserPreferences().pipe(take(1)).subscribe();
    this.localStorage.removeItem('currentUser');
    this.localStorage.removeItem('token');
    this.router.navigate(['/auth']);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  private isTokenExpired(token: string): boolean {
    const decoded: any = jwtDecode(token);
    return Date.now() >= decoded.exp * 1000;
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
