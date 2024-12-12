import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route } from '@angular/router';
import { User } from 'src/app/models/user';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser!: User | any;

  private readonly api = `${environment.apiUrl}User`;

  constructor(private http: HttpClient) { }

  setUser(response: { token: string, user: User }) {
    response.user.userPreferences = JSON.parse(response.user.userPreferences);
    localStorage.setItem('token', 'token');
    localStorage.setItem('currentUser', JSON.stringify(response.user));
    this.currentUser = response.user;
  }

  getCurrentUser() {
    if (!this.currentUser) {
      let user = localStorage.getItem('currentUser');
      if (user) {
        this.currentUser = JSON.parse(user);
      }
    }
    console.log(this.currentUser)
    return this.currentUser;
  }

  updateUserPreferences() {
    let newUserPreferences = {
      userPreferences: JSON.stringify(this.currentUser?.userPreferences)
    };

    return this.http.put(`${this.api}/${this.currentUser?.id.toString()}`, newUserPreferences);
  }
}
