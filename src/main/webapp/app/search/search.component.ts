import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, ParseLinks, PaginationUtil, AlertService } from 'ng-jhipster';
import { Response } from '@angular/http';

import { Identity } from '../entities/identity/identity.model';
import { IdentityService } from '../entities/identity/identity.service';
import { Account, LoginModalService, Principal } from '../shared';

@Component({
    selector: 'search',
    templateUrl: './search.component.html',
    styleUrls: [
        'search.css'
    ]

})
export class SearchComponent implements OnInit {
    identities: Identity[];
    account: Account;
    modalRef: NgbModalRef;

    constructor(
        private identityService: IdentityService,
        private alertService: AlertService,
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.loadIdentities();
        this.registerAuthenticationSuccess();
    }

    loadIdentities() {
        this.principal.identity().then((account) => {
            this.identityService.findNotMe(account.login).subscribe(
            (res: Response) => {
                this.identities = res.json()
            },
            (res: Response) => this.onError(res.json())
            );
        });
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
