import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { CoreService } from '@utils/services/core.service';
import { MessageModalComponent } from '@utils/components/message-modal/message-modal.component';
import { CustomMessageService } from '@utils/services/custom-message.service';
import { MessageProcessingComponent } from '@utils/components/message-processing/message-processing.component';
import { AppConfigurator } from './app/layout/component/app.configurator';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule, ToastModule, MessageModalComponent, MessageProcessingComponent, AppConfigurator],
    template: `
        @if (coreService.processing()) {
            <app-message-processing />
        }

        @if (customMessageService.modalVisible()) {
            <app-message-modal />
        }

        <p-toast position="top-right" [life]="5000" />

        <app-configurator />

        <router-outlet></router-outlet>`
})
export class AppComponent {
    protected readonly coreService = inject(CoreService);
    protected readonly customMessageService = inject(CustomMessageService);
}
