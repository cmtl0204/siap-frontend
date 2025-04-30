import { inject, Injectable } from '@angular/core';
import { HttpResponseInterface, SignInInterface, SignUpInterface } from './interfaces';
import { environment } from '@env/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AuthService } from '@modules/auth/auth.service';
import { SignInResponseInterface } from '@modules/auth/interfaces';
import { MessageService } from 'primeng/api';
import { CustomMessageService } from '@utils/services/custom-message.service';
import { CoreService } from '@utils/services/core.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthHttpService {
    private readonly _authService = inject(AuthService);
    private readonly _httpClient = inject(HttpClient);
    private readonly _apiUrl = `${environment.API_URL}/auth`;
    private readonly _coreService = inject(CoreService);
    private readonly _customMessageService = inject(CustomMessageService);

    signIn(payload: SignInInterface) {
        const url = `${this._apiUrl}/sign-in`;

        return this._httpClient.post<SignInResponseInterface>(url, payload).pipe(
            map((response) => {
                this._authService.accessToken = response.data.accessToken;

                this._authService.auth = response.data.auth;

                this._authService.roles = response.data.roles;

                if (response.data.roles.length === 1) {
                    this._authService.role = response.data.roles[0];
                }

                this._customMessageService.showSuccess({ summary: response.title, detail: response.message });

                return response;
            })
        );
    }

    requestTransactionalCode(username: string): Observable<HttpResponseInterface> {
        const url = `${this._apiUrl}/transactional-codes/${username}/request`;
        return this._httpClient.get<HttpResponseInterface>(url).pipe(
            map((response) => {
                this._customMessageService.showHttpSuccess(response);
                return response.data;
            })
        );
    }

    requestTransactionalEmailCode(email: string): Observable<HttpResponseInterface> {
        const url = `${this._apiUrl}/transactional-email-codes/${email}/request`;
        return this._httpClient.get<HttpResponseInterface>(url).pipe(
            map((response) => {
                this._customMessageService.showHttpSuccess(response);
                return response.data;
            })
        );
    }

    verifyTransactionalCode(token: string, username: string): Observable<HttpResponseInterface> {
        const url = `${this._apiUrl}/transactional-codes/${token}/verify`;
        return this._httpClient.patch<HttpResponseInterface>(url, { username }).pipe(
            map((response) => {
                this._customMessageService.showHttpSuccess(response);
                return response.data;
            })
        );
    }

    verifyRecaptcha(token: string) {
        const url = `${this._apiUrl}/verify-recaptcha`;

        const params = new HttpParams().set('token', token);

        return this._httpClient.post<HttpResponseInterface>(url, null, { params: params }).pipe(
            map((response) => {
                if (!response) {
                    this._customMessageService.showError({
                        summary: 'No pasó la validación de reCAPTCHA',
                        detail: 'Por favor vuelva a intentar'
                    });
                }

                return response.data;
            })
        );
    }

    verifyIdentification(identification: string) {
        const url = `${this._apiUrl}/verify-identification/${identification}`;

        return this._httpClient.get<HttpResponseInterface>(url).pipe(
            map((response) => {
                return response.data;
            })
        );
    }

    signInByValidationIdentification(identification: string) {
        const url = `${this._apiUrl}/sign-in-validation-identification/${identification}`;

        return this._httpClient.get<SignInResponseInterface>(url).pipe(
            map((response) => {
                this._authService.accessToken = response.data.accessToken;

                this._authService.auth = response.data.auth;

                this._authService.roles = response.data.roles;

                if (response.data.roles.length === 1) {
                    this._authService.role = response.data.roles[0];
                }

                this._customMessageService.showSuccess({ summary: response.title, detail: response.message });

                return response;
            })
        );
    }

    acceptTermsConditions() {
        const url = `${this._apiUrl}/terms-conditions/accept`;

        return this._httpClient.patch<HttpResponseInterface>(url, null).pipe(
            map((response) => {
                this._authService.auth = { ...this._authService.auth, termsConditions: true };
                this._customMessageService.showHttpSuccess(response);
                return response.data;
            })
        );
    }

    rejectTermsConditions() {
        const url = `${this._apiUrl}/terms-conditions/reject`;

        return this._httpClient.patch<HttpResponseInterface>(url, null).pipe(
            map((response) => {
                this._customMessageService.showHttpSuccess(response);
                return response.data;
            })
        );
    }
}
