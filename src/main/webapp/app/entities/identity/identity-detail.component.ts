import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager  } from 'ng-jhipster';

import { Identity } from './identity.model';
import { IdentityService } from './identity.service';

@Component({
    selector: 'jhi-identity-detail',
    templateUrl: './identity-detail.component.html'
})
export class IdentityDetailComponent implements OnInit, OnDestroy {

    identity: Identity;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private identityService: IdentityService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInIdentities();
    }

    load(id) {
        this.identityService.find(id).subscribe((identity) => {
            this.identity = identity;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInIdentities() {
        this.eventSubscriber = this.eventManager.subscribe(
            'identityListModification',
            (response) => this.load(this.identity.id)
        );
    }
}
