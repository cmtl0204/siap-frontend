import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CoreService } from '@utils/services/core.service';
import { AuthService } from '@modules/auth/auth.service';
import { Router } from '@angular/router';

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
    const _coreService = inject(CoreService);
    const _authService = inject(AuthService);
    const _router = inject(Router);

    return next(req).pipe(
        catchError((error) => {
            // Cuando el usuario no está autenticado
            if (error.status === 401) {
                _authService.removeLogin();
                _router.navigateByUrl('/auth/sign-in');
            }

            // Cuando el usuario no tiene permisos para acceder al recurso solicitado y se encuentra logueado
            if (error.status === 403 && _authService.accessToken) {
                _authService.removeLogin();
                _router.navigate(['/login']);
            }

            // Cuando el usuario no tiene permisos para acceder al recurso solicitado y no está logueado
            if (error.status === 403 && !_authService.accessToken) {
                _authService.removeLogin();
                _router.navigate(['/login']);
            }

            // Cuando el usuario está suspendido
            if (error.status === 429) {
                _authService.removeLogin();
                _router.navigate(['/login']);
            }

            // Cuando la aplicación o una ruta está en mantenimiento
            if (error.status === 503) {
                _authService.removeLogin();
                _coreService.serviceUnavailable = error.error.data;
                _router.navigate(['/common/503']);
            }

            return throwError(() => error);
        })
    );
};
