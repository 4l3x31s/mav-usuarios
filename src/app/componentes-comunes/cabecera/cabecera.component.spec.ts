import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CabeceraPage } from './cabecera.page';

describe('CabeceraPage', () => {
  let component: CabeceraPage;
  let fixture: ComponentFixture<CabeceraPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CabeceraPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CabeceraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
