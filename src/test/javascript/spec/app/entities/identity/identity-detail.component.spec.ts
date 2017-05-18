import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { PkafTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { IdentityDetailComponent } from '../../../../../../main/webapp/app/entities/identity/identity-detail.component';
import { IdentityService } from '../../../../../../main/webapp/app/entities/identity/identity.service';
import { Identity } from '../../../../../../main/webapp/app/entities/identity/identity.model';

describe('Component Tests', () => {

    describe('Identity Management Detail Component', () => {
        let comp: IdentityDetailComponent;
        let fixture: ComponentFixture<IdentityDetailComponent>;
        let service: IdentityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PkafTestModule],
                declarations: [IdentityDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    IdentityService,
                    EventManager
                ]
            }).overrideComponent(IdentityDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IdentityDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IdentityService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Identity(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.identity).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
