// auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { User } from 'src/app/models/user';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly api = `${environment.apiUrl}Auth`;

  constructor(private http: HttpClient, private localStorage: LocalStorageService, private router: Router, private userService: UserService) { }

  login(credentials: { emailOrUsername: string; password: string }): Observable<any> {
    return this.http.post(`${this.api}/login`, credentials);
  }

  logout() {
    this.userService.updateUserPreferences().pipe(take(1)).subscribe(() => {
    });
    this.userService.currentUser = null;

    this.localStorage.removeItem('currentUser');
    this.localStorage.removeItem('token');
    this.router.navigate(['/auth']);
  }

  isLoggedIn() {
    return localStorage.getItem('token') != null;
  }
}
