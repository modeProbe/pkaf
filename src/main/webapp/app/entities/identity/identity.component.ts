import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, AlertService } from 'ng-jhipster';

import { Identity } from './identity.model';
import { IdentityService } from './identity.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-identity',
    templateUrl: './identity.component.html'
})
export class IdentityComponent implements OnInit, OnDestroy {
identities: Identity[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private identityService: IdentityService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.identityService.query().subscribe(
            (res: Response) => {
                this.identities = res.json();
            },
            (res: Response) => this.onError(res.json())
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInIdentities();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Identity) {
        return item.id;
    }
    registerChangeInIdentities() {
        this.eventSubscriber = this.eventManager.subscribe('identityListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
