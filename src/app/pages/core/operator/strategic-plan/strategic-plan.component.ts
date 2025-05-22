import { Component, inject, Input } from '@angular/core';
import { Accordion, AccordionContent, AccordionHeader, AccordionPanel } from 'primeng/accordion';
import { PrimeIcons } from 'primeng/api';
import { MY_ROUTES } from '@routes';
import { BreadcrumbService } from '../../../../layout/service/breadcrumb.service';
import { StrategicPlanFormComponent } from '@modules/core/operator/strategic-plan/strategic-plan-form/strategic-plan-form.component';
import { StrategicPlanDocumentComponent } from '@modules/core/operator/strategic-plan/strategic-plan-document/strategic-plan-document.component';

@Component({
    selector: 'app-strategic-plan',
    imports: [Accordion, AccordionContent, AccordionHeader, AccordionPanel, StrategicPlanFormComponent, StrategicPlanDocumentComponent],
    templateUrl: './strategic-plan.component.html',
    styleUrl: './strategic-plan.component.scss'
})
export class StrategicPlanComponent {
    @Input({ required: true, alias: 'id' }) strategicPlanId!: string;
    protected readonly PrimeIcons = PrimeIcons;
    private readonly _breadcrumbService = inject(BreadcrumbService);

    constructor() {
        this._breadcrumbService.setItems([
            {
                label: 'Planes Estratégicos',
                routerLink: [MY_ROUTES.corePages.operator.strategicPlan.list.absolute]
            },
            { label: 'Formulario' }
        ]);
    }
}
