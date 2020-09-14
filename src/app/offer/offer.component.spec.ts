import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { offerComponent } from './offer.component';

describe('offerComponent', () => {
  let component: offerComponent;
  let fixture: ComponentFixture<offerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ offerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(offerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
