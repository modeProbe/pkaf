import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PkafSharedModule } from '../shared';

import { SEARCH_ROUTE, SearchComponent } from './';

@NgModule({
    imports: [
        PkafSharedModule,
        RouterModule.forRoot([ SEARCH_ROUTE ], { useHash: true })
    ],
    declarations: [
        SearchComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PkafSearchModule {}
