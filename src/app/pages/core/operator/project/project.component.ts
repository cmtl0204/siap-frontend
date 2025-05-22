import { Component, Input } from '@angular/core';
import { Accordion, AccordionContent, AccordionHeader, AccordionPanel } from 'primeng/accordion';
import { PrimeIcons } from 'primeng/api';
import { ProjectFormComponent } from '@modules/core/operator/project/project-form/project-form.component';
import { ProjectDocumentComponent } from '@modules/core/operator/project/project-document/project-document.component';

@Component({
    selector: 'app-project',
    imports: [Accordion, AccordionContent, AccordionHeader, AccordionPanel, ProjectFormComponent, ProjectDocumentComponent],
    templateUrl: './project.component.html',
    styleUrl: './project.component.scss'
})
export class ProjectComponent {
    @Input({ required: true, alias: 'id' }) projectId!: string;
    protected readonly PrimeIcons = PrimeIcons;

    constructor() {}
}
