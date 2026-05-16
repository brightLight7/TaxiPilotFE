import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastMsgPopupComponent } from './toast-msg-popup.component';

describe('ToastMsgPopupComponent', () => {
  let component: ToastMsgPopupComponent;
  let fixture: ComponentFixture<ToastMsgPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToastMsgPopupComponent]
    });
    fixture = TestBed.createComponent(ToastMsgPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
