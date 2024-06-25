// auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { User } from 'src/app/models/user';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser!: User | any;

  private api = `${environment.apiUrl}users`;

  constructor(private http: HttpClient, private localStorage: LocalStorageService, private router: Router) { }

  login(username: string, password: string): Observable<any> {
    return this.http.get<string>(`${this.api}/${username}/${password}`).pipe(
      tap((response: any) => {
        if (response) {
          response.userPreferences = JSON.parse(response.userPreferences);
          localStorage.setItem('token', 'token');
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.currentUser = response;
        }
        throw new Error('An error occurred while fetching data.');
      })
    );
  }

  logout() {
    this.updateUserPreferences().pipe(take(1)).subscribe(() => {
    });
    this.currentUser = null;

    this.localStorage.removeItem('currentUser');
    this.localStorage.removeItem('token');
    this.router.navigate(['/auth']);
  }

  getCurrentUser() {
    if (!this.currentUser) {
      const user = localStorage.getItem('currentUser');
      if (user) {
        this.currentUser = JSON.parse(user);
      }
    }
    return this.currentUser;
  }

  isLoggedIn() {
    return localStorage.getItem('currentUser') != null;
  }

  updateUserPreferences() {
    let newUserPreferences = {
      userPreferences: JSON.stringify(this.currentUser?.userPreferences)
    };

    return this.http.put<any>(`${this.api}/${this.currentUser?.id.toString()}`, newUserPreferences);
  }
}
