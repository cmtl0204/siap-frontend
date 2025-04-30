import { Routes } from '@angular/router';
import { UserComponent } from '@modules/user/user.component';
import { MY_ROUTES } from '@routes';

export default [{ path: MY_ROUTES.pages.users.profile, component: UserComponent }] as Routes;
