// auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = `${environment.apiUrl}users`;

  constructor(private http: HttpClient, private localStorage: LocalStorageService) { }

  login(username: string, password: string): Observable<string> {
    return this.http.get<string>(`${this.api}/${username}/${password}`);
  }

  isLoggedIn() {
    return this.localStorage.getItem('isLoggedIn') == 'true';
  }
}
