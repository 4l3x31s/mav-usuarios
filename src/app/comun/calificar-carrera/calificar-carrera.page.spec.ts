import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificarCarreraPage } from './calificar-carrera.page';

describe('CalificarCarreraPage', () => {
  let component: CalificarCarreraPage;
  let fixture: ComponentFixture<CalificarCarreraPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalificarCarreraPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalificarCarreraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
