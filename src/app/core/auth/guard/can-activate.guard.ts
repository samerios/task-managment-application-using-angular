import { Component, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateAuthGuard implements CanActivate, CanDeactivate<Component> {
  constructor(private authService: AuthService, private router: Router) { }
  canDeactivate(_component: Component, _currentRoute: ActivatedRouteSnapshot, _currentState: RouterStateSnapshot, _nextState: RouterStateSnapshot): MaybeAsync<GuardResult> {
    return !this.canActivate();
  }
  /*   canDeactivate(_component: IndexComponent, _currentRoute: ActivatedRouteSnapshot, _currentState: RouterStateSnapshot, _nextState: RouterStateSnapshot): MaybeAsync<GuardResult> {
      return this.test();
    } */

  canActivate(): boolean {
    return this.test();
  }

  test() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/auth']);
      return false;
    } else {
      return true;
    }
  }
}
