import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { IdentityComponent } from './identity.component';
import { IdentityDetailComponent } from './identity-detail.component';
import { IdentityPopupComponent } from './identity-dialog.component';
import { IdentityDeletePopupComponent } from './identity-delete-dialog.component';

import { Principal } from '../../shared';

export const identityRoute: Routes = [
    {
        path: 'identity',
        component: IdentityComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Identities'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'identity/:id',
        component: IdentityDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Identities'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const identityPopupRoute: Routes = [
    {
        path: 'identity-new',
        component: IdentityPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Identities'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'identity/:id/edit',
        component: IdentityPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Identities'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'identity/:id/delete',
        component: IdentityDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Identities'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
