import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppConfigurator } from './app/layout/component/app.configurator';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule, AppConfigurator],
    template: `
        <app-configurator />
        <router-outlet></router-outlet>`
})
export class AppComponent {}
