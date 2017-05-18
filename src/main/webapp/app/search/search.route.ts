import { Route } from '@angular/router';

import { SearchComponent } from './';

export const SEARCH_ROUTE: Route = {
    path: 'search',
    component: SearchComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Proposer un café!'
    }
};
