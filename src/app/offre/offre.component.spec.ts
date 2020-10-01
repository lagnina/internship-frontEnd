import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { offreComponent } from './offre.component';

describe('offreComponent', () => {
  let component: offreComponent;
  let fixture: ComponentFixture<offreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ offreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(offreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
