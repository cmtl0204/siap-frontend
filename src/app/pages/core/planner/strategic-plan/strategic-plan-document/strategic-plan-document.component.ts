import { Component, inject, Input, OnInit } from '@angular/core';
import { Accordion, AccordionContent, AccordionHeader, AccordionPanel } from 'primeng/accordion';
import { PrimeIcons } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { FileInterface } from '@utils/interfaces';
import { Button } from 'primeng/button';
import { FileUpload } from 'primeng/fileupload';
import { environment } from '@env/environment';
import { CustomMessageService } from '@utils/services/custom-message.service';
import { ProjectHttpService } from '@modules/core/planner/project/project-http.service';
import { FileHttpService } from '@utils/services';
import { CatalogueService } from '@utils/services/catalogue.service';
import { CatalogueTypeEnum } from '@utils/enums';
import { Tooltip } from 'primeng/tooltip';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-strategic-plan-document',
    imports: [Accordion, AccordionPanel, AccordionHeader, AccordionContent, TableModule, Button, FileUpload, Tooltip, DatePipe],
    templateUrl: './strategic-plan-document.component.html',
    styleUrl: './strategic-plan-document.component.scss'
})
export class StrategicPlanDocumentComponent implements OnInit {
    @Input() strategicPlanId!: string;
    protected readonly PrimeIcons = PrimeIcons;
    protected readonly _customMessageService = inject(CustomMessageService);
    protected readonly _projectHttpService = inject(ProjectHttpService);
    protected readonly _fileHttpService = inject(FileHttpService);
    protected readonly _catalogueService = inject(CatalogueService);
    protected technicalFeasibilityDocuments: FileInterface[] = [];
    protected approvalDocuments: FileInterface[] = [];
    protected programDocuments: FileInterface[] = [];
    protected fileUploadUrl: string = environment.API_URL;
    protected activeIndex: string = '0';

    constructor() {}

    ngOnInit() {
        this.fileUploadUrl = `${this.fileUploadUrl}/common/files/${this.strategicPlanId}/upload`;

        this.findTechnicalFeasibilityDocuments();
        this.findApprovalDocuments();
        this.findProgramDocuments();
    }

    uploadTechnicalFeasibilityDocument(event: any) {
        const formData = new FormData();
        formData.append('file', event.files[0]);

        const types = this._catalogueService.findByType(CatalogueTypeEnum.TECHNICAL_FEASIBILITY_DOCUMENT);
        const type = types.find((type) => type.code === 'technicalFeasibilityDocument')!;

        this._fileHttpService.upload(formData, this.strategicPlanId, type.id!).subscribe({
            next: (data) => {
                this.findTechnicalFeasibilityDocuments();
                this.activeIndex = '1';
            }
        });
    }

    findTechnicalFeasibilityDocuments() {
        this._projectHttpService.findTechnicalFeasibilityDocuments(this.strategicPlanId).subscribe({
            next: (data) => {
                this.technicalFeasibilityDocuments = data;
            }
        });
    }

    uploadApprovalDocument(event: any) {
        const formData = new FormData();
        formData.append('file', event.files[0]);

        const types = this._catalogueService.findByType(CatalogueTypeEnum.APPROVAL_DOCUMENT);
        const type = types.find((type) => type.code === 'approvalDocument')!;

        this._fileHttpService.upload(formData, this.strategicPlanId, type.id!).subscribe({
            next: (data) => {
                this.findApprovalDocuments();
                this.activeIndex = '2';
            }
        });
    }

    findApprovalDocuments() {
        this._projectHttpService.findApprovalDocuments(this.strategicPlanId).subscribe({
            next: (data) => {
                this.approvalDocuments = data;
            }
        });
    }

    uploadProgramDocument(event: any) {
        const formData = new FormData();
        formData.append('file', event.files[0]);

        const types = this._catalogueService.findByType(CatalogueTypeEnum.PROGRAM_DOCUMENT);
        const type = types.find((type) => type.code === 'programDocument')!;

        this._fileHttpService.upload(formData, this.strategicPlanId, type.id!).subscribe({
            next: (data) => {
                this.findProgramDocuments();
                this.activeIndex = '3';
            }
        });
    }

    findProgramDocuments() {
        this._projectHttpService.findProgramDocuments(this.strategicPlanId).subscribe({
            next: (data) => {
                this.programDocuments = data;
            }
        });
    }

    download(file: FileInterface) {
        this._fileHttpService.downloadFile(file);
    }
}
