// auth.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/shared/models/user';
import { UserPreferencesService } from './user-preferences.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private readonly baseUrl = `${environment.apiUrl}`;

  // Create a private Subject to store the current user
  private currentUserSubject: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);

  // Expose the Subject as an Observable for other components to subscribe to
  public currentUser$: Observable<User | null> =
    this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(values: { email: string; password: string }): Observable<User> {
    let params = new HttpParams();
    params = params.append('useCookies', true);
    return this.http.post<User>(`${this.baseUrl}login`, values, { params });
  }

  getUserInfo() {
    return this.http.get<User>(this.baseUrl + 'account/user-info').pipe(
      map((user) => {
        this.currentUserSubject.next(user);
        return user;
      })
    );
  }

  logout() {
    return this.http.post(this.baseUrl + 'account/logout', {}).pipe(
      tap(() => {
        localStorage.removeItem('userPreferences');
        this.currentUserSubject.next(null);
        this.router.navigateByUrl('/');
      })
    );
  }

  // Get the current user value synchronously
  get getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  getAuthState() {
    return this.http.get<{ isAuthenticated: boolean }>(
      this.baseUrl + 'account/auth-status'
    );
  }
}
