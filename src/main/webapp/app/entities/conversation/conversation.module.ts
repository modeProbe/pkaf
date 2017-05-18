import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PkafSharedModule } from '../../shared';
import {
    ConversationService,
    ConversationPopupService,
    ConversationComponent,
    ConversationDetailComponent,
    ConversationDialogComponent,
    ConversationPopupComponent,
    ConversationDeletePopupComponent,
    ConversationDeleteDialogComponent,
    conversationRoute,
    conversationPopupRoute,
} from './';

const ENTITY_STATES = [
    ...conversationRoute,
    ...conversationPopupRoute,
];

@NgModule({
    imports: [
        PkafSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ConversationComponent,
        ConversationDetailComponent,
        ConversationDialogComponent,
        ConversationDeleteDialogComponent,
        ConversationPopupComponent,
        ConversationDeletePopupComponent,
    ],
    entryComponents: [
        ConversationComponent,
        ConversationDialogComponent,
        ConversationPopupComponent,
        ConversationDeleteDialogComponent,
        ConversationDeletePopupComponent,
    ],
    providers: [
        ConversationService,
        ConversationPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PkafConversationModule {}
