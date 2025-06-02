import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HttpResponseInterface } from '@modules/auth/interfaces';
import { CustomMessageService } from '@utils/services/custom-message.service';
import { ProjectInterface } from '@modules/core/interfaces';

@Injectable({
    providedIn: 'root'
})
export class ProgramHttpService {
    private readonly _httpClient = inject(HttpClient);
    private readonly _apiUrl = `${environment.API_URL}/core/planner/programs`;
    private readonly _customMessageService = inject(CustomMessageService);

    find(page: number = 1) {
        const url = `${this._apiUrl}`;

        const params = new HttpParams().append('page', page).append('limit', 10);

        return this._httpClient.get<HttpResponseInterface>(url, { params }).pipe(
            map((response) => {
                return response.data;
            })
        );
    }

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

    findTechnicalFeasibilityDocuments(id: string) {
        const url = `${this._apiUrl}/${id}/technical-feasibility-documents`;

        return this._httpClient.get<HttpResponseInterface>(url).pipe(
            map((response) => {
                return response.data;
            })
        );
    }

    findApprovalDocuments(id: string) {
        const url = `${this._apiUrl}/${id}/approval-documents`;

        return this._httpClient.get<HttpResponseInterface>(url).pipe(
            map((response) => {
                return response.data;
            })
        );
    }

    findProgramDocuments(id: string) {
        const url = `${this._apiUrl}/${id}/program-documents`;

        return this._httpClient.get<HttpResponseInterface>(url).pipe(
            map((response) => {
                return response.data;
            })
        );
    }
}
