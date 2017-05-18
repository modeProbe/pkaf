import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { Identity } from './identity.model';
import { IdentityPopupService } from './identity-popup.service';
import { IdentityService } from './identity.service';
import { User, UserService } from '../../shared';
import { Conversation, ConversationService } from '../conversation';

@Component({
    selector: 'jhi-identity-dialog',
    templateUrl: './identity-dialog.component.html'
})
export class IdentityDialogComponent implements OnInit {

    identity: Identity;
    authorities: any[];
    isSaving: boolean;

    users: User[];

    conversations: Conversation[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private identityService: IdentityService,
        private userService: UserService,
        private conversationService: ConversationService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.userService.query().subscribe(
            (res: Response) => { this.users = res.json(); }, (res: Response) => this.onError(res.json()));
        this.conversationService.query().subscribe(
            (res: Response) => { this.conversations = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.identity.id !== undefined) {
            this.subscribeToSaveResponse(
                this.identityService.update(this.identity));
        } else {
            this.subscribeToSaveResponse(
                this.identityService.create(this.identity));
        }
    }

    private subscribeToSaveResponse(result: Observable<Identity>) {
        result.subscribe((res: Identity) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Identity) {
        this.eventManager.broadcast({ name: 'identityListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }

    trackConversationById(index: number, item: Conversation) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-identity-popup',
    template: ''
})
export class IdentityPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private identityPopupService: IdentityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.identityPopupService
                    .open(IdentityDialogComponent, params['id']);
            } else {
                this.modalRef = this.identityPopupService
                    .open(IdentityDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
