import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { User } from 'src/app/models/user';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser!: User | any;

  private readonly api = `${environment.apiUrl}User`;

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

  setUser(response: { token: string, user: User }) {
    response.user.userPreferences = JSON.parse(response.user.userPreferences);
    localStorage.setItem('token', response.token);
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
    return this.currentUser;
  }

  userPreferencesChanges(key: string, value: string) {
    this.currentUser = this.getCurrentUser();

    if (typeof this.currentUser == 'string') this.currentUser = JSON.parse(this.currentUser);

    if (typeof this.currentUser["userPreferences"] == "string")
      this.currentUser.userPreferences = JSON.parse(this.currentUser.userPreferences);

    this.currentUser.userPreferences[key] = value;
    this.currentUser = this.currentUser;
    this.localStorageService.setItem('currentUser', JSON.stringify(this.currentUser))
    this.updateUserPreferences().pipe(take(1)).subscribe();
  }

  updateUserPreferences() {
    let newUserPreferences = {
      userPreferences: JSON.stringify(this.currentUser?.userPreferences)
    };

    return this.http.put(`${this.api}/${this.currentUser?.id.toString()}`, newUserPreferences);
  }
}
