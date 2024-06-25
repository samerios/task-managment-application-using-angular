import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/tasks']);
      return false;
    } else {
      return true;
    }
  }

  canActivateChild(): boolean {
    return this.canActivate();
  }
}
