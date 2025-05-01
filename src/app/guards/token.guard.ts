import {CanActivateFn} from "@angular/router";
import {inject} from "@angular/core";
import { AuthService } from '@modules/auth/auth.service';

export const tokenGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  if (authService.accessToken) {
    return true;
  }

  authService.removeLogin();

  return false;
}
