import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { Conversation } from './conversation.model';
import { ConversationPopupService } from './conversation-popup.service';
import { ConversationService } from './conversation.service';
import { Identity, IdentityService } from '../identity';

@Component({
    selector: 'jhi-conversation-dialog',
    templateUrl: './conversation-dialog.component.html'
})
export class ConversationDialogComponent implements OnInit {

    conversation: Conversation;
    authorities: any[];
    isSaving: boolean;

    identities: Identity[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private conversationService: ConversationService,
        private identityService: IdentityService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.identityService.query().subscribe(
            (res: Response) => { this.identities = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.conversation.id !== undefined) {
            this.subscribeToSaveResponse(
                this.conversationService.update(this.conversation));
        } else {
            this.subscribeToSaveResponse(
                this.conversationService.create(this.conversation));
        }
    }

    private subscribeToSaveResponse(result: Observable<Conversation>) {
        result.subscribe((res: Conversation) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Conversation) {
        this.eventManager.broadcast({ name: 'conversationListModification', content: 'OK'});
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

    trackIdentityById(index: number, item: Identity) {
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
    selector: 'jhi-conversation-popup',
    template: ''
})
export class ConversationPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private conversationPopupService: ConversationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.conversationPopupService
                    .open(ConversationDialogComponent, params['id']);
            } else {
                this.modalRef = this.conversationPopupService
                    .open(ConversationDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
