// auth.guard.ts
import { inject, Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { of, map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);

  const router = inject(Router);

  if (accountService.getCurrentUser) {
    return of(true);
  } else {
    return accountService.getAuthState().pipe(
      map((auth) => {
        if (auth.isAuthenticated) {
          return true;
        } else {
          accountService.logout().pipe(take(1)).subscribe();
          router.navigate(
            ['/account/login'] /* , { queryParams: { returnUrl: state.url } } */
          );
          return false;
        }
      })
    );
  }
};
