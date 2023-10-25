import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuardActivate: CanActivateFn = (
  router: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const isLoggedIn = inject(AuthService).isLoggedIn();
  return isLoggedIn ? isLoggedIn : inject(Router).createUrlTree(['/login']);
};
