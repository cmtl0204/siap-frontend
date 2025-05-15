import { Component, inject, OnInit } from '@angular/core';
import { MY_ROUTES } from '@routes';
import { BreadcrumbService } from '../../../../../layout/service/breadcrumb.service';

@Component({
    selector: 'app-program-document',
    imports: [],
    templateUrl: './program-document.component.html',
    styleUrl: './program-document.component.scss'
})
export class ProgramDocumentComponent implements OnInit {
    private readonly _breadcrumbService = inject(BreadcrumbService);

    constructor() {
        this._breadcrumbService.setItems([
            {
                label: 'Proyectos',
                routerLink: [MY_ROUTES.corePages.manager.program.list.absolute]
            },
            { label: 'Documentos' }
        ]);
    }

    ngOnInit() {}
}
