import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OurCommitmentComponent } from './our-commitment.component';

describe('OurCommitmentComponent', () => {
    let component: OurCommitmentComponent;
    let fixture: ComponentFixture<OurCommitmentComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ OurCommitmentComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OurCommitmentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
