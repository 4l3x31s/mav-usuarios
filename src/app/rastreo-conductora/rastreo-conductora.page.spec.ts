import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RastreoConductoraPage } from './rastreo-conductora.page';

describe('RastreoConductoraPage', () => {
  let component: RastreoConductoraPage;
  let fixture: ComponentFixture<RastreoConductoraPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RastreoConductoraPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RastreoConductoraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
