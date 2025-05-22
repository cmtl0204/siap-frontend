import { Component, inject, Input } from '@angular/core';
import { Accordion, AccordionContent, AccordionHeader, AccordionPanel } from 'primeng/accordion';
import { PrimeIcons } from 'primeng/api';
import { ProjectFormComponent } from '@modules/core/operator/project/project-form/project-form.component';
import { ProjectDocumentComponent } from '@modules/core/operator/project/project-document/project-document.component';
import { ProgramFormComponent } from '@modules/core/operator/program/program-form/program-form.component';
import { ProgramDocumentComponent } from '@modules/core/operator/program/program-document/program-document.component';
import { MY_ROUTES } from '@routes';
import { BreadcrumbService } from '../../../../layout/service/breadcrumb.service';

@Component({
    selector: 'app-program',
    imports: [Accordion, AccordionContent, AccordionHeader, AccordionPanel, ProjectFormComponent, ProjectDocumentComponent, ProgramFormComponent, ProgramDocumentComponent],
    templateUrl: './program.component.html',
    styleUrl: './program.component.scss'
})
export class ProgramComponent {
    @Input({ required: true, alias: 'id' }) projectId!: string;
    protected readonly PrimeIcons = PrimeIcons;
    private readonly _breadcrumbService = inject(BreadcrumbService);

    constructor() {
        this._breadcrumbService.setItems([
            {
                label: 'Programas',
                routerLink: [MY_ROUTES.corePages.operator.program.list.absolute]
            },
            { label: 'Formulario' }
        ]);
    }
}
