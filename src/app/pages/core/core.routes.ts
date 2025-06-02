import { Routes } from '@angular/router';
import { MY_ROUTES } from '@routes';
import { roleGuard } from '@guards';
import { RoleEnum } from '@utils/enums';

export default [
    {
        path: MY_ROUTES.corePages.planner.base,
        canActivate: [roleGuard],
        data: { roles: [RoleEnum.PLANNER] },
        loadChildren: () => import('@modules/core/planner/planner.routes')
    },
    {
        path: MY_ROUTES.corePages.operator.base,
        canActivate: [roleGuard],
        data: { roles: [RoleEnum.OPERATOR] },
        loadChildren: () => import('@modules/core/operator/operator.routes')
    }
] as Routes;
