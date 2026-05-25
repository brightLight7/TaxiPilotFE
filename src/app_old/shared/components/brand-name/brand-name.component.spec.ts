import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandNameComponent } from './brand-name.component';

describe('BrandNameComponent', () => {
    let component: BrandNameComponent;
    let fixture: ComponentFixture<BrandNameComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ BrandNameComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BrandNameComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
