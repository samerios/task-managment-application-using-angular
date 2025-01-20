import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take, tap } from 'rxjs';
import { UserPreferences } from 'src/app/shared/models/user';
import { environment } from 'src/environments/environment';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root',
})
export class UserPreferencesService {
  private readonly api = `${environment.apiUrl}account/update-user-prefs`;

  userPreferences!: UserPreferences;

  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {
    this.userPreferences = JSON.parse(
      this.accountService.getCurrentUser?.userPreferences || ''
    );
  }

  userPreferencesChanges() {
    this.updateUserPreferences().pipe(take(1)).subscribe();
  }

  updateUserPreferences() {
    return this.http.put(`${this.api}`, this.userPreferences).pipe(
      tap(() => {
        if (this.accountService.getCurrentUser)
          localStorage.setItem(
            'userPreferences',
            JSON.stringify(this.userPreferences)
          );
        this.accountService.getUserInfo().pipe(take(1)).subscribe();
      })
    );
  }
}
