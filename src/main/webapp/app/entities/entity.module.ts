import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PkafIdentityModule } from './identity/identity.module';
import { PkafConversationModule } from './conversation/conversation.module';
import { PkafMessageModule } from './message/message.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        PkafIdentityModule,
        PkafConversationModule,
        PkafMessageModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PkafEntityModule {}
