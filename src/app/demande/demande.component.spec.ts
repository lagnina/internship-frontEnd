import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { demandeComponent } from './demande.component';

describe('demandeComponent', () => {
  let component: demandeComponent;
  let fixture: ComponentFixture<demandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ demandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(demandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
