import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AuthService } from '@modules/auth/auth.service';
import { HttpResponseInterface } from '@modules/auth/interfaces';
import { CustomMessageService } from '@utils/services/custom-message.service';
import { CoreService } from '@utils/services/core.service';
import { ProjectInterface } from '@modules/core/interfaces';

@Injectable({
    providedIn: 'root'
})
export class ProjectHttpService {
    private readonly _httpClient = inject(HttpClient);
    private readonly _apiUrl = `${environment.API_URL}/core/manager/projects`;
    private readonly _customMessageService = inject(CustomMessageService);

    findAll() {
        const url = `${this._apiUrl}`;

        return this._httpClient.get<HttpResponseInterface>(url).pipe(
            map((response) => {
                return response.data;
            })
        );
    }

    findOne(id: string) {
        const url = `${this._apiUrl}/${id}`;

        return this._httpClient.get<HttpResponseInterface>(url).pipe(
            map((response) => {
                return response.data;
            })
        );
    }

    findByUser(userId: string) {
        const url = `${this._apiUrl}/users/${userId}`;

        return this._httpClient.get<HttpResponseInterface>(url).pipe(
            map((response) => {
                const data = response.data;

                const startedAt = data?.startedAt ? new Date(data.startedAt) : null;
                const endedAt = data?.endedAt ? new Date(data.endedAt) : null;

                return {
                    ...data,
                    startedAt,
                    endedAt
                };
            })
        );
    }

    create(payload: ProjectInterface) {
        const url = `${this._apiUrl}`;

        return this._httpClient.post<HttpResponseInterface>(url, payload).pipe(
            map((response) => {
                this._customMessageService.showSuccess({ summary: response.title, detail: response.message });

                return response.data;
            })
        );
    }

    update(id: string, payload: ProjectInterface) {
        const url = `${this._apiUrl}/${id}`;

        return this._httpClient.put<HttpResponseInterface>(url, payload).pipe(
            map((response) => {
                this._customMessageService.showSuccess({ summary: response.title, detail: response.message });

                return response.data;
            })
        );
    }

    delete(id: string) {
        const url = `${this._apiUrl}/${id}`;

        return this._httpClient.delete<HttpResponseInterface>(url).pipe(
            map((response) => {
                this._customMessageService.showSuccess({ summary: response.title, detail: response.message });

                return response.data;
            })
        );
    }
}
