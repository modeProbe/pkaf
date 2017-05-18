import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager } from 'ng-jhipster';

import { Identity } from './identity.model';
import { IdentityPopupService } from './identity-popup.service';
import { IdentityService } from './identity.service';

@Component({
    selector: 'jhi-identity-delete-dialog',
    templateUrl: './identity-delete-dialog.component.html'
})
export class IdentityDeleteDialogComponent {

    identity: Identity;

    constructor(
        private identityService: IdentityService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.identityService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'identityListModification',
                content: 'Deleted an identity'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-identity-delete-popup',
    template: ''
})
export class IdentityDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private identityPopupService: IdentityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.identityPopupService
                .open(IdentityDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
