import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrerasAceptadasPage } from './carreras-aceptadas.page';

describe('CarrerasAceptadasPage', () => {
  let component: CarrerasAceptadasPage;
  let fixture: ComponentFixture<CarrerasAceptadasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarrerasAceptadasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrerasAceptadasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
