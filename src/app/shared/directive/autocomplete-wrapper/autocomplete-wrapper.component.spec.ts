import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteWrapperComponent } from './autocomplete-wrapper.component';

describe('AutocompleteWrapperComponent', () => {
  let component: AutocompleteWrapperComponent;
  let fixture: ComponentFixture<AutocompleteWrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutocompleteWrapperComponent]
    });
    fixture = TestBed.createComponent(AutocompleteWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
