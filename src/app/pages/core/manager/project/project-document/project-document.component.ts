import { Component, inject, OnInit } from '@angular/core';
import { MY_ROUTES } from '@routes';
import { BreadcrumbService } from '../../../../../layout/service/breadcrumb.service';

@Component({
    selector: 'app-project-document',
    imports: [],
    templateUrl: './project-document.component.html',
    styleUrl: './project-document.component.scss'
})
export class ProjectDocumentComponent implements OnInit {
    private readonly _breadcrumbService = inject(BreadcrumbService);

    constructor() {
        this._breadcrumbService.setItems([
            {
                label: 'Proyectos',
                routerLink: [MY_ROUTES.corePages.manager.project.list.absolute]
            },
            { label: 'Documentos' }
        ]);
    }

    ngOnInit() {}
}
