import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroCarreraPage } from './registro-carrera.page';

describe('RegistroCarreraPage', () => {
  let component: RegistroCarreraPage;
  let fixture: ComponentFixture<RegistroCarreraPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroCarreraPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroCarreraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
