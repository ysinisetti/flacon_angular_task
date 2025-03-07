import { Routes } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details/user-details.component';
import { AddUserDetailsComponent } from './user-details/add-user-details/add-user-details.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full',
    },
    {
        path: 'users',
        component: UserDetailsComponent,
        loadChildren: () => import('./user-details/user-details.module')
            .then(m=>m.UserDetailsModule),
    },
    {
        path:'create-user',
        component: AddUserDetailsComponent
    }
];
