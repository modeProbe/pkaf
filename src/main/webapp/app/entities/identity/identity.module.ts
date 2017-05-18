import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PkafSharedModule } from '../../shared';
import { PkafAdminModule } from '../../admin/admin.module';
import {
    IdentityService,
    IdentityPopupService,
    IdentityComponent,
    IdentityDetailComponent,
    IdentityDialogComponent,
    IdentityPopupComponent,
    IdentityDeletePopupComponent,
    IdentityDeleteDialogComponent,
    identityRoute,
    identityPopupRoute,
} from './';

const ENTITY_STATES = [
    ...identityRoute,
    ...identityPopupRoute,
];

@NgModule({
    imports: [
        PkafSharedModule,
        PkafAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        IdentityComponent,
        IdentityDetailComponent,
        IdentityDialogComponent,
        IdentityDeleteDialogComponent,
        IdentityPopupComponent,
        IdentityDeletePopupComponent,
    ],
    entryComponents: [
        IdentityComponent,
        IdentityDialogComponent,
        IdentityPopupComponent,
        IdentityDeleteDialogComponent,
        IdentityDeletePopupComponent,
    ],
    providers: [
        IdentityService,
        IdentityPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PkafIdentityModule {}
