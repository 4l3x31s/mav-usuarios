import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CabeceraBackPage } from './cabecera-back.page';

describe('CabeceraBackPage', () => {
  let component: CabeceraBackPage;
  let fixture: ComponentFixture<CabeceraBackPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CabeceraBackPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CabeceraBackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
