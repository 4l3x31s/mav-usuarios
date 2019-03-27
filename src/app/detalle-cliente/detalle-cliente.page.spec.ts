import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleClientePage } from './detalle-cliente.page';

describe('DetalleClientePage', () => {
  let component: DetalleClientePage;
  let fixture: ComponentFixture<DetalleClientePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleClientePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
