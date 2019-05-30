import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirImagenPage } from './subir-imagen.page';

describe('SubirImagenPage', () => {
  let component: SubirImagenPage;
  let fixture: ComponentFixture<SubirImagenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubirImagenPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubirImagenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
