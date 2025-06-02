import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '@modules/auth/auth.service';
import { RoleInterface } from '@modules/auth/interfaces';
import { MY_ROUTES } from '@routes';


export const roleGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const authService: AuthService = inject(AuthService);

    if (!authService.auth) {
        router.navigateByUrl(MY_ROUTES.errorPages.forbidden.absolute);
        return false;
    }

    const authRole: RoleInterface = authService.role;

    if (authRole) {
        for (const role of route.data['roles']) {
            if (role.toUpperCase() === authRole.code.toUpperCase()) return true;
        }
    }

    router.navigateByUrl(MY_ROUTES.errorPages.forbidden.absolute);

    return false;
};
